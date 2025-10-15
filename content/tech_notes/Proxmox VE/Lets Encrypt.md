Configuring Lets Encrypt certificate for Proxmox UI and API

Instructions from [Derek Seamans Tech Blog](https://www.derekseaman.com/2023/04/proxmox-lets-encrypt-ssl-the-easy-button.html)

## Creating Let's Encrypt Proxmox Accounts

We need to create two accounts in Proxmox so we can generate staging and production certificates.

1. In the left pane click on **Datacenter**, then in the middle pane select **ACME**, and in the right pane click on **Add** under **Accounts**.


![screenshot](./Images/Pasted%20image%2020250622134038.png)


2. Enter the following information:

**Account Name:** Staging  
**E-mail:** us**@******in.com  
**ACME Directory:** Let’s Encrypt v2 Staging  
**Accept TOS:** Tick box

Click **Register**.
![screenshot](./Images/Pasted%20image%2020250622134127.png)

3. Create another account for production:

**Account Name:** Production  
**E-mail:** us**@******in.com  
**ACME Directory:** Let’s Encrypt v2  
**Accept TOS:** Tick box

Click Register.
![screenshot](./Images/Pasted%20image%2020250622134213.png)

You should now see two accounts listed.
![[Pasted image 20250622134232.png]]

## Add Cloudflare DNS ACME Plugin

The ACME DNS Plugin is what contains the necessary code to talk to the Cloudflare API and create the TXT record needed to prove to Let’s Encrypt you own the domain you want the certificate issued to. Proxmox has a number of built–in DNS providers, so if you aren’t using Cloudflare DNS review the list for a plugin to see if your provider is listed.

1. In the **ACME** pane under **Challenge Plugins** click **Add**. Fill in the following information:

**Plugin ID:** Cloudflare  
**DNS API:** Cloudflare Managed DNS  
**CF_Account_ID=** Your Cloudflare Account ID  
**CF_Token=** Your Cloudflare DNS API Token (Not Global token)

Click **Add**.
![screenshot](./Images/Pasted%20image%2020250622134246.png)

## Configure Domain ACME Challenge

This step configures the domain name that we want the certificate issued to. 

1. In the left pane click on your **Proxmox physical server** then in the middle pane click on **Certificates**.  
2. Under **ACME** click on **Add**. Configure the following. Make sure you use the **FQDN** of your Proxmox host (e.g. **proxmox1.mydomain.com**) for the domain. Do NOT just enter your registered domain name. 

- **Challenge Type:** DNS
- **Plugin:** Cloudflare
- **Domain:** _FQDN_

Click on **Create**.

![screenshot](./Images/Pasted%20image%2020250622134255.png)

## Minting your Let's Encrypt SSL Certificate

This section will mint your staging and production certificates. If your staging certificate request is a success, then proceed to doing the Production request. Let’s Encrypt rate limits production requests so ensure everything works in Staging before doing a Production request.

1. Under **ACME** and next to **Using Account:** click on **Edit**. Select Staging, then click **Apply**.  
2. Click on the domain you added. Click on **Order Certificates Now**.  
3. Monitor the Task viewer for any errors. If everything is successful Promox will restart its web server and you can refresh your browser. Your browser will still show an invalid SSL certificate, but if you look at the properties you will see it’s issued by Let’s Encrypt staging.  
![screenshot](./Images/Pasted%20image%2020250622134307.png)



4. Next to **Using Account** click **Edit** and change to **Production**.  
5. Click on **Order Certificates Now**.  
6. Monitor the Task viewer for any errors. If all goes well the Proxmox UI will restart, then refresh your browser and make sure you are connecting via your domain’s FQDN and port **8006**. You should not see any SSL certificate errors in your browser.  
  
**Note:** Some browsers may need you to close the old Proxmox webpage and open a new tab/window with the FQDN to get rid of the certificate warning. 
![screenshot](./Images/Pasted%20image%2020250622134329.png)
