
This document assumes you are configuring the debian system from a remote machine (Client)
- Be Sure to install SSH Server During install.
- Make sure the client machine has SSH configured, and SSH public keys pushed to Github 

- SCP System Scripts from client to Debian
	- `scp -r .\SystemScripts\ <USER_NAME>@<REMOTE_SYSTEM_NAME>:~`
- SSH into Debian (from client)
	- `ssh <USER_NAME>@<REMOTE_SYSTEM_NAME>`
- switch to root
	- `su -`
- Install Sudo
	- `apt install sudo`
- set user as sudoer
	- `adduser <USER_NAME> sudo`
	- !! User must Logout and log back end to take effect !!

Remove cdrom from sources.list
- `sudo nano /etc/apt/sources.list`
-  Delete the cdrom line and save file

Configure SSH by running ssh-server-config.sh
- `sudo ./SystemScripts/debian_12/ssh-server-config.sh`
- !! If the Client you are running from has not pushed its keys to Github, you will not be able to login via SSH after this !!




