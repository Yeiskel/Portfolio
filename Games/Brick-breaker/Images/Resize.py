from PIL import Image

img_name =  str(input("Inserte el nombre de la imagen a reescalar: "))
x = int(input("Inserte el tamaño en X de la imagen a reescalar: "))
y = int(input("Inserte el tamaño en Y de la imagen a reescalar: "))
new_img_name = str(input("Inserte el nombre de la nueva imagen: "))

im = Image.open(img_name)
new_size = im.resize((x,y))
new_size.save(new_img_name)