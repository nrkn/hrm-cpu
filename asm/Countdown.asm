-- HUMAN RESOURCE MACHINE PROGRAM --

a:
    INBOX   
    COPYTO   0
b:
c:
    OUTBOX  
    COPYFROM 0
    JUMPN    d
    JUMPZ    a
    BUMPDN   0
    JUMP     c
d:
    BUMPUP   0
    JUMP     b


