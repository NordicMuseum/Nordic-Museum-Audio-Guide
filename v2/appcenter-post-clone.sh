cd src/assets
rm -rf audio
rm -rf images
git clone https://$USER:$TOKEN@github.com/NordicMuseum/Nordic-Museum-Audio-Guide-Assets.git
mv Nordic-Museum-Audio-Guide-Assets/audio/ audio
mv Nordic-Museum-Audio-Guide-Assets/images/ images
rm -rf Nordic-Museum-Audio-Guide-Assets