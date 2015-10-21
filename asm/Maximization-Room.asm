-- HUMAN RESOURCE MACHINE PROGRAM --

a:
    INBOX   
    COPYTO   0
    INBOX   
    COPYTO   1
    SUB      0
    JUMPN    b
    COPYFROM 1
    JUMP     c
b:
    COPYFROM 0
c:
    OUTBOX  
    JUMP     a


