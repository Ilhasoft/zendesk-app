BRAND="Temba"
DOMAIN="temba.ngrok.io"

echo "Creating working copy of app..."

rm -Rf build/
rsync -a app/ build
cd build

echo "Renaming placeholders..."
find . -type f -exec sed -i "s/\\\$BRAND\\\$/$BRAND/g" {} +
find . -type f -exec sed -i "s/\\\$DOMAIN\\\$/$DOMAIN/g" {} +

echo "Packaging app..."

zat package