#
#detection.py
#Deven Schwartz
#Eary version of dection on animals (only looking at cats and dogs, no subspecies in this version, early framework present for later implementation)
######expirmenting with Eye nose face detection on animal images

import numpy as np
import cv2
import sys

#seveal haarcascades files avaible at
#https://github.com/opencv/opencv/tree/master/data/haarcascades

face_cascade = cv2.CascadeClassifier('haarcascade_frontalcatface_extended.xml')
face_cascade_dog = cv2.CascadeClassifier('dog.xml')

eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
nose_cascade = cv2.CascadeClassifier('nose.xml')

#testing files
#haarcascade_frontalface_default
#haarcascade_frontalcatface
#haarcascade_frontalcatface_extended
#dog_face
#dog

#open image
try:

    img = cv2.imread(sys.argv[1])

except:
    print("Image not provided or does not exist.")        


    
    #change img color to do detection
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


#all eyes overlayed
eyes = eye_cascade.detectMultiScale(gray, 1.25, 3)
for (ex,ey,ew,eh) in eyes:
    cv2.rectangle(img,(ex,ey),(ex+ew,ey+eh),(160,40,100),2)

    
    
    
##cat face                        img, scale fact, min neighbor points
faces = face_cascade.detectMultiScale(gray, 1.1, 1)
####this outputs coords so use following to draw on a box
for (x,y,w,h) in faces:
    img = cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
    #limiting the region for eye detection
    gray2 = gray[y:y+h, x:x+w]
    img2 = img[y:y+h, x:x+w]
    #eyes in the face region
    eyes = eye_cascade.detectMultiScale(gray2, 1.3)
    for (ex,ey,ew,eh) in eyes:
        cv2.rectangle(img2,(ex,ey),(ex+ew,ey+eh),(100,200,255),2)

        #same idea as cat faces
dog_faces = face_cascade_dog.detectMultiScale(gray, 1.55, 7)
for (x,y,w,h) in dog_faces:
    img = cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,255),2)
    gray2 = gray[y:y+h, x:x+w]
    img2 = img[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(gray2)
    for (ex,ey,ew,eh) in eyes:
        cv2.rectangle(img2,(ex,ey),(ex+ew,ey+eh),(100,200,255),2)
#eyes = eye_cascade.detectMultiScale(gray, 1.3, 5)
#for (ex,ey,ew,eh) in eyes:
#    img = cv2.rectangle(img,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)

#same idea with nose
nose = nose_cascade.detectMultiScale(gray, 1.1, 3)
for (ex,ey,ew,eh) in nose:
    img = cv2.rectangle(img,(ex,ey),(ex+ew,ey+eh),(255,255,0),2)

        
        
        
#show final result then a kill all 
cv2.imshow('img',img)
cv2.waitKey(0)
cv2.destroyAllWindows()

#eof
