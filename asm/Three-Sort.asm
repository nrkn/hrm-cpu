-- HUMAN RESOURCE MACHINE PROGRAM --

a:
    INBOX   
    COPYTO   0
    INBOX   
    COPYTO   1
    INBOX   
    COPYTO   2
    COMMENT  2
    SUB      1
    JUMPN    b
    COMMENT  1
    JUMP     c
b:
    COMMENT  0
    COPYFROM 2
    COPYTO   3
    COPYFROM 1
    COPYTO   2
    COPYFROM 3
    COPYTO   1
c:
    COMMENT  4
    COPYFROM 2
    SUB      0
    JUMPN    e
    COMMENT  6
    COMMENT  7
    COPYFROM 0
    SUB      1
    JUMPN    d
    COPYFROM 0
    COPYTO   3
    COPYFROM 1
    COPYTO   0
    COPYFROM 3
    COPYTO   1
d:
    JUMP     f
e:
    COMMENT  5
    COPYFROM 0
    COPYTO   3
    COPYFROM 1
    COPYTO   0
    COPYFROM 2
    COPYTO   1
    COPYFROM 3
    COPYTO   2
f:
    COMMENT  3
    COPYFROM 0
    OUTBOX  
    COPYFROM 1
    OUTBOX  
    COPYFROM 2
    OUTBOX  
    JUMP     a


DEFINE COMMENT 0
eJzTZWBg2Cxvn6uvKJh8QK0udIPONf9qky1+YWaSQaesdmY02BVOvG/HMv+QrdHK59Z/1q+1bNriaJS7
h19373EbjYCrHdZbbyiHHnyoH3PwIdAohrb4rjj27M/V2aWFEzXLtkzWLJOcXhj9Zz1IrqC+0Ke1+bW7
cddJN76e1+6p/df8HSaqRc+fuKTgZW9E/faOk93zJwZMqJpcN6tq8pol0pNDVjlMtN/U1ft8+/aO3D2C
9T6751Yd3cYwCkbBKKAaAADikVFE;

DEFINE COMMENT 1
eJxTZWBg2Cz/KKJPMSbkl0ahD7+unle3XqGPp757TLdeSOoGnYS8q1oR9Tp6qR1HDbZMdjR6PHeBUciq
ZkPZjTp6HDufqmjtMpdbshVoDMN1R5aoVW5dcUdCnhdtjuqv4Avk7StwyVwEkptRoBbtVv494HrNNf/g
urrQTXUJeVNrtUoVK+81+5W87mnOUVvwp+r9MsZWwRUMo2AUjAK6AQCwrjs8;

DEFINE COMMENT 2
eJxzYGBgKFRgiTqhLBmUqLbF7676Fr8dmjEhG3Smp+fpPi/K093bZKI9eZKNxuO5Qgo717qo/lm/QefP
+u+mTVuAWhkifK2DGb0eRcy1v1S1y6GqQc+1rXO777UpIDlOd46SS0VapSD2hvS6UJ3MutDnZUYpz8v+
ZIkUtXVaFsyfDZLrbYiwMu7SMvDo0zJQntBnPH+imaXDxC1+R/pZogK6/2TtmWSfGzpVq1R4mlndlql6
/bGTuhZ79JWudm6Zvgakf8bqCKtLazeYLN30XNduK4f+rm0RVru2Ffq8X/e8aMK6z9V+6yPqQerC1hzd
9n31rXUT1u1c+36d7MawNUu2MoyCUTDCAQDJN2yB;

DEFINE COMMENT 3
eJyzYmBgSJGcPOmDCG/fD8HXPU94efvecFnP0ONSW6DHZb/pDZfPbme+eydKhJVOd4rfO3FYMuKIvXT/
3t0ya5bslrlUdVgy1whoBEOkJm/fXfW6WXXqgivKtLR26eht2PfdtH/vVjOf3SLmTVtEzNcs+W4aM3Ov
ccCEs7ptnRt0VnRt0NHrB+mda9+/d6799DVTnfT6z7swtHK6VzXIee9tMvY/2f0ySHL6kZCuxUdCcveA
1H6pld0oUmS/iT27dDV/RtfiHSkBE34lVzUEpj8vUslpyt+bt6SguOhztWFxVYNhcVvn3rzJk85mWM9g
GAWjYBRgBQBHSmNL;

DEFINE COMMENT 4
eJyzYWBgcJd4n6ivGODtoyQZxKUsmJyoptgmr35tygG1vceB0gyVsrOPNRveOwFiO3veytzkrFXKYqvY
9tz6dY+i3ZbJgi4s8xd5vl82yd9+E0hNsLNze1cQQ+vL3nvNIL5ew86M9d1N+VWTlxRsmcpR8m8ib9+R
/rpZy/sOzgHJpy177b5ghbPT99WKjn7rT7ppbpzsq7lxfhjPhq64uJWfq7euYWjN3jB5kubGmJmaG9cs
ObVBcEXx2p1rAxfdWgfSf3xvqjPjgVTnOwdPuokdiQkRO5KQt2i/Wd3xvW2dx/dumbxo//zZIHW1B0UP
MYyCUTAKUAAAJi1lAw;

DEFINE COMMENT 5
eJyTYWBgiDNOdf5vpHQayGTgirMOfpSjVdqc87n6bEZqx4HEg3OYEt0Xvo0xWgmSf9J80u1KJ4ODdi+D
g8PEQp/YSfPDYiedTWiaYJ97pke0dn13RP2/iXr9NydLTr852X3hnkmCK4y7OHa2NmvtKqhv2sIwCkbB
KBhUAAAb+i9n;

DEFINE COMMENT 6
eJxTYGBgeG8haqFpvcFkrn2uUa23t2GEb5+xmF+E1XbfVOc3rpJBm5zVooOdBZPlvPsrtvvubTL2P9k9
yf/HVGufg3NYbENWVZv8WQ80hqG46FHE9ZqQ1C+109O/1MrmzCh4PHdvXuYix9yuxSB53xlaBgbTzSwv
TlvhenFaf8W76QytDKNgFIyCAQUAiBgzog;

DEFINE COMMENT 7
eJyzY2BgaJRicDihvMHkgBqHfqJayKq3iqWrD0ueW3pWN3HzVrPEzUAlDGJ+K1x3OUxPt7OXzbGzX1Iw
1WlD5XH32Y3rA1Z0nQls6wSpOe5un6sdFJI6L8woZVNdSCpIrKOMx5OlgsdTrdk6mLG1LnR/66OIjCb7
XO/GS1XejYptIDW+Mz6bLZ7NoV83l0O/bMFsm08LJYNMFhqllC34k3VgTn/FxWnO7coT9PqVJ2yZ3D+d
ZX73kpBVzctDVoH0Pt8422bu1g0mZjsumQbvNLMU3MXjKbhrftjUHaVpu7Y9L3LbJFr7fGNVw/ONbZ1L
NwVMAOmZu5VjJ8MoGAWjAAwAn5dk6A;

DEFINE LABEL 0
eJzjYWBg6BR/FDFPen6YuoqeV5vK47nqKu4LfZTcF1bK1s2yl54/u1JWbYG+YtdiHb1zSxlGwSgYBcMK
AABfEBDz;

DEFINE LABEL 1
eJwTZGBgCExnierOlAxSyZnsG1b42v198Wv37FLJILdy2RyWiktVS8vbOouL5s/em5e5KDFRduPq2KPb
fiUf3dZRZn5YsVL0EMMoGAWjYMgCAOEsHbE;

DEFINE LABEL 2
eJwTZWBgeOIx2TfBa4Xr8mAzywehVdYx4YqOm6MyYzdH5ZZPizSrUw5N7bjip9efGxgwYVrkmiWbo3au
DYnq37s7POLI8mCl086ezmcy3JVOb3IWPbTL4eg2hlEwCkbBkAEAtvAkow;

DEFINE LABEL 3
eJyzZWBgmChyzT9c6F7zNqF7J4BchgLOyZN6uQIm/BA82T1PekXXW0W9fpD4K73S1Y5Gt9ZpWv9Zf98u
ZFWFI8v8Csf5s3msePuqTXj7mg0LJ57VPTiHXzdz0SdtrV2ftCOObNBhOPVK7+QFRyO9K1vNAq7uctC7
AjLL2id3zx1v94VifjEz1wdcm+IRvGXy37DHc79GNm0Rik7cvDr24Jyn8Xr9v5JXdImnnuw2SSuc+Cpz
59oVWbIbj2bbbwKZYVar129X9fmAXdXJC4qVVUcPVdhvsquqm1VRs6JrU51im3OLc/udNr3+We0H5yxq
EVzR22C0Mrp6zRKGUTAKRgEcAADovW4T;
