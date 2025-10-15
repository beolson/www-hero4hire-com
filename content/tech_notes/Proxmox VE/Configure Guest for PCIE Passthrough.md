Create a VM as normal.  

On the System Tab
- For "Machine" - Select q35
- For "BIOS" - Select "OVMF (UEFI)"
- For "EFI Storage" - Select a storage 

![Pasted image 20250720060933](./Images/Pasted%20image%2020250720060933.png)

After machine is created, Add a PCI Device
![Pasted image 20250720061244](./Images/Pasted%20image%2020250720061244.png)

Under "Add PCI Device" screen:
- Select "Raw Device"
- Select Device in dropdown
- Check "All Functions"
- Check "PCI-Express"
![Pasted image 20250720061520](./Images/Pasted%20image%2020250720061520.png)

If installing NVIDIA Drivers, Disable Secure boot
- When booting VM, Press "esc" to enter bios
- In Bios
    - Select "Device Manager"
    - Select "Secure Boot Configuration"
    - Make sure "Attempt Secure Boot" is unchecked

![[Pasted image 20250720062137.png]]