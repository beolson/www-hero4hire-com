[Source](https://pve.proxmox.com/wiki/PCI_Passthrough)

## Summary:

```
dmesg | grep -e DMAR -e IOMMU
dmesg | grep -e 'remapping'
pvesh get /nodes/pve1/hardware/pci --pci-class-blacklist ""
more /etc/modprobe.d/blacklist.conf
touch /etc/modprobe.d/blacklist.conf
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist nvidia*" >> /etc/modprobe.d/blacklist.conf 
more /etc/modprobe.d/blacklist.conf
reboot
```


## Requirements

This is a list of basic requirements adapted from [the Arch wiki](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF#Prerequisites)

CPU requirements

Your CPU has to support hardware virtualization and IOMMU. Most new CPUs support this.

- AMD: CPUs from the Bulldozer generation and newer, CPUs from the K10 generation need a 890FX or 990FX motherboard.
- Intel: [list of VT-d capable Intel CPUs](https://ark.intel.com/content/www/us/en/ark/search/featurefilter.html?productType=873&0_VTD=True)

Motherboard requirements

Your motherboard needs to support IOMMU. Lists can be found on [the Xen wiki](https://wiki.xenproject.org/wiki/VTd_HowTo) and [Wikipedia](https://en.wikipedia.org/wiki/List_of_IOMMU-supporting_hardware). Note that, as of writing, both these lists are incomplete and very out-of-date and most newer motherboards support IOMMU.

GPU requirements

The ROM of your GPU does not necessarily need to support UEFI, however, most modern GPUs do. If you GPU ROM supports UEFI, it is recommended to use OVMF (UEFI) instead of SeaBIOS. For a list of GPU ROMs, see [Techpowerup's collection of GPU ROMs](https://www.techpowerup.com/vgabios/?architecture=&manufacturer=&model=&version=&interface=&memType=&memSize=&since=)

## Verifying IOMMU parameters

### Verify IOMMU is enabled

Reboot, then run:

dmesg | grep -e DMAR -e IOMMU

There should be a line that looks like "DMAR: IOMMU enabled". If there is no output, something is wrong.

### Verify IOMMU interrupt remapping is enabled

It is not possible to use PCI passthrough without interrupt remapping. Device assignment will fail with 'Failed to assign device "[device name]": Operation not permitted' or 'Interrupt Remapping hardware not found, passing devices to unprivileged domains is insecure.'.

All systems using an Intel processor and chipset that have support for Intel Virtualization Technology for Directed I/O (VT-d), but do not have support for interrupt remapping will see such an error. Interrupt remapping support is provided in newer processors and chipsets (both AMD and Intel).

To identify if your system has support for interrupt remapping:

dmesg | grep 'remapping'

If you see one of the following lines:

- `AMD-Vi: Interrupt remapping enabled`
- `DMAR-IR: Enabled IRQ remapping in x2apic mode` ('x2apic' can be different on old CPUs, but should still work)

then remapping is supported.

If your system doesn't support interrupt remapping, you can allow unsafe interrupts with:

echo "options vfio_iommu_type1 allow_unsafe_interrupts=1" > /etc/modprobe.d/iommu_unsafe_interrupts.conf

### Verify IOMMU isolation

For working PCI passthrough, you need a dedicated IOMMU group for all PCI devices you want to assign to a VM.

When executing

# pvesh get /nodes/{nodename}/hardware/pci --pci-class-blacklist ""

replacing {nodename} with the name of your node.

You should get a list similar to:

┌──────────┬────────┬──────────────┬────────────┬────────┬───────────────────────────────────────────────────────────────────┬...
│ class    │ device │ id           │ iommugroup │ vendor │ device_name                                                       │
╞══════════╪════════╪══════════════╪════════════╪════════╪═══════════════════════════════════════════════════════════════════╪
│ 0x010601 │ 0xa282 │ 0000:00:17.0 │          5 │ 0x8086 │ 200 Series PCH SATA controller [AHCI mode]                        │
├──────────┼────────┼──────────────┼────────────┼────────┼───────────────────────────────────────────────────────────────────┼
│ 0x010802 │ 0xa808 │ 0000:02:00.0 │         12 │ 0x144d │ NVMe SSD Controller SM981/PM981/PM983                             │
├──────────┼────────┼──────────────┼────────────┼────────┼───────────────────────────────────────────────────────────────────┼
│ 0x020000 │ 0x15b8 │ 0000:00:1f.6 │         11 │ 0x8086 │ Ethernet Connection (2) I219-V                                    │
├──────────┼────────┼──────────────┼────────────┼────────┼───────────────────────────────────────────────────────────────────┼
│ 0x030000 │ 0x5912 │ 0000:00:02.0 │          2 │ 0x8086 │ HD Graphics 630                                                   │
├──────────┼────────┼──────────────┼────────────┼────────┼───────────────────────────────────────────────────────────────────┼
│ 0x030000 │ 0x1d01 │ 0000:01:00.0 │          1 │ 0x10de │ GP108 [GeForce GT 1030]                                           │
├──────────┼────────┼──────────────┼────────────┼────────┼───────────────────────────────────────────────────────────────────┼
.
.
.

To have separate IOMMU groups, your processor needs to have support for a feature called ACS (Access Control Services). Make sure you enable the corresponding setting in your BIOS for this.

If you don't have dedicated IOMMU groups, you can try moving the card to another PCI slot.

Should that not work, you can try using [Alex Williamson's ACS override patch](https://lkml.org/lkml/2013/5/30/513). However, this should be seen as a last option and is [not without risks](http://vfio.blogspot.be/2014/08/iommu-groups-inside-and-out.html).

As of writing, the ACS patch is part of the Proxmox VE kernel and can be invoked via [Editing the kernel command line](https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#sysboot_edit_kernel_cmdline). Add

pcie_acs_override=downstream

to the kernel boot command line (grub or systemd-boot) options.

More information can be found at [Alex Williamson's blog](http://vfio.blogspot.com/).

## GPU passthrough

|   |   |
|---|---|
|[![Yellowpin.svg](https://pve.proxmox.com/mediawiki/images/thumb/d/db/Yellowpin.svg/32px-Yellowpin.svg.png)](https://pve.proxmox.com/wiki/File:Yellowpin.svg)|**Note**: See [http://blog.quindorian.org/2018/03/building-a-2u-amd-ryzen-server-proxmox-gpu-passthrough.html/](http://blog.quindorian.org/2018/03/building-a-2u-amd-ryzen-server-proxmox-gpu-passthrough.html/) if you like an article with a How-To approach. (NOTE: you usually do not need the ROM-file dumping mentioned at the end!)|

- AMD RADEON 5xxx, 6xxx, 7xxx, NVIDIA GeForce 7, 8, GTX 4xx, 5xx, 6xx, 7xx, 9xx, 10xx, 15xx, 16xx, and RTX 20xx have been reported working. Anything newer should work as well.
- AMD Navi (5xxx(XT)/6xxx(XT)) suffer from the reset bug (see [https://github.com/gnif/vendor-reset](https://github.com/gnif/vendor-reset)), and while dedicated users have managed to get them to run, they require a lot more effort and will probably not work entirely stable (see the [AMD specific issues](https://pve.proxmox.com/wiki/PCI_Passthrough#AMD_specific_issues "PCI Passthrough") for workarounds).
- You might need to load some specific options in grub.cfg or other tuning values to get your configuration specifically working/stable
- Here's a good forum thread of Arch Linux: [https://bbs.archlinux.org/viewtopic.php?id=162768](https://bbs.archlinux.org/viewtopic.php?id=162768)

For starters, it's often helpful if the host doesn't try to use the GPU, which avoids issues with the host driver unbinding and re-binding to the device. Sometimes making sure the host BIOS POST messages are displayed on a different GPU is helpful too. This can sometimes be acomplished via BIOS settings, moving the card to a different slot or enabling/disabling legacy boot support.

### Blacklisting drivers

The following is a list of common drivers and how to blacklist them:

- AMD GPUs

echo "blacklist amdgpu" >> /etc/modprobe.d/blacklist.conf
echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf

- NVIDIA GPUs

echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist nvidia*" >> /etc/modprobe.d/blacklist.conf 

- Intel GPUs

echo "blacklist i915" >> /etc/modprobe.d/blacklist.conf

|   |   |
|---|---|
|[![Yellowpin.svg](https://pve.proxmox.com/mediawiki/images/thumb/d/db/Yellowpin.svg/32px-Yellowpin.svg.png)](https://pve.proxmox.com/wiki/File:Yellowpin.svg)|**Note**: If you are using an Intel iGPU and an Intel discrete GPU, blacklisting the Intel 'i915' drivers that the discrete GPU uses means the iGPU won't be able to use those drivers either.|

After blacklisting, you will need to reboot.