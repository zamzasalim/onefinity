<p style="font-size:14px" align="right">
<a href="https://t.me/airdropasc" target="_blank">Join our telegram <img src="https://user-images.githubusercontent.com/50621007/183283867-56b4d69f-bc6e-4939-b00a-72aa019d1aea.png" width="30"/></a>
</p>

<p align="center">
  <img height="300" height="auto" src="https://user-images.githubusercontent.com/109174478/209359981-dc19b4bf-854d-4a2a-b803-2547a7fa43f2.jpg">
</p>

# ONE-FINITY BOT | Auto Transfer Multi Wallet

## Install 
```
git clone https://github.com/zamzasalim/onefinity.git
```

## Paste PrivateKeys | USE 2 WALLET
```
cd /root/onefinity
```
```
nano .env
```
**After Paste CTRL + XY**

## Install Modul | Need ethers 5.7.2 - Don't use V6
```
sudo apt install nodejs npm
```
```
npm install
```
```
npm install ethers@5.7.2
```
```
npm audit fix
```
**Check ethers version**
```
npm list ethers
```
**Error?? -> Uninstall ethers & Reinstall Modul**
```
npm uninstall ethers
```
```
rm -rf node_modules package-lock.json
```

## RUN Bot
**Create Screen**
```
screen -S one
```
**Run Bot**
```
npm start
```
## Troubleshoot Screen 
**Close Screen | CTRL + AD**

**Go back to Screen**
```
Screen -r one
```
**Delete Screen**
```
screen -S one -X kill
```
