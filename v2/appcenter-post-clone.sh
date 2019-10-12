cd src/assets
rm -rf audio
rm -rf images
git clone https://$USER:$TOKEN@github.com/NordicMuseum/Nordic-Museum-Audio-Guide-Assets.git
mv Nordic-Museum-Audio-Guide-Assets/audio/ audio
mv Nordic-Museum-Audio-Guide-Assets/images/ images
mv Nordic-Museum-Audio-Guide-Assets/secrets/appcenter-config.json ../../android/app/src/main/assets/appcenter-config.json
mv Nordic-Museum-Audio-Guide-Assets/secrets/AppCenter-Config.plist ../../ios/AppCenter-Config.plist
rm -rf Nordic-Museum-Audio-Guide-Assets