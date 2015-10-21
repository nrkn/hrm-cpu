-- HUMAN RESOURCE MACHINE PROGRAM --

    COMMENT  0
    COPYFROM 9
    COPYTO   8
    BUMPUP   8
    COMMENT  1
a:
    INBOX   
    COPYTO   0
    COMMENT  2
    COPYFROM 9
    COPYTO   1
    COPYFROM 8
    COPYTO   2
    OUTBOX  
    COMMENT  3
b:
    COPYFROM 2
    ADD      1
    COPYTO   3
    COPYFROM 0
    SUB      3
    JUMPN    a
    COPYFROM 3
    OUTBOX  
    COPYFROM 2
    COPYTO   1
    COPYFROM 3
    COPYTO   2
    JUMP     b


DEFINE COMMENT 0
eJxTZWBg+CDStKVEuG7WNqGdGUAuw20BBgcQvVpp+hp59c/VNhreZVe1mvJf6S0paDbsr5AxWdElYj59
DUjNG9c1SwRd3BdOdZo8KdphScEf+/eJIPG59lXWIPpvWISVfdgKV/uwz9V/w1Z0mUfOn10YrbZAPilz
EUg+IEAw+UK0Ucrq2DXxIH7EP5/dDKNgFIwCugEAev00hA;

DEFINE COMMENT 1
eJyzZGBgmKxdujpGJmTVBxGW+Qn8ARPUeGc3tvJqldYIhKReFn4UwSsWEyIlW5pmLpeQN02uvyJGZnbj
X2nFtkap1A5/0bZOK0HFNqAxDIYWr90rHE+66bkW+uz3yoz96fMnS8xvQ2WpX1WDmN+Pqfu9WOZzunct
3uTctXipjeR0HqvXPTxWDK3ZVlUNh2yPFtrZJ+RNdbLPZfTyLgOZ97NdbYFcm17/ohaOktbmQh+Q2Jfa
EAUQfXPyveaqyVqlNyfXhZ6cWehjM6/Q5+qC7wF5i88mdC95XtS9pK0TpG7RL/tNDKNgFIwCnAAAG6ZX
dA;

DEFINE COMMENT 2
eJyzY2Bg2CaUuahPsWsxkxrLfBfVmJmskhH1H0SOFooKh6RuE2KJmigSE8IqaR0MVMpwyPbH1FNWP6Yu
MAqYwK/r3C6utaEyUvN5UaTmn6yrWmrR3Xp6XmkGbS7/jVa4bjW75l9sHhMiYu4eU21yK/OR4dHCFfpa
pZO1tUpBZt3x1jJY5LnFb5Fnadp+r6Z8ax+t0o/+orWNoWZ1IPk3rixRYn6PIthCYkJ2h2/xA4kxJXbF
zU72LjNJ29sUmH6v+VXm3ib27EtVK7LeJ4Lk71fab1KstA4Ortvit6pxi9+T5rpQubY/WYytCXnBdU35
IDVPft5axzAKRsEoAAMA+h5dvg;

DEFINE COMMENT 3
eJwzZ2Bg8FFybj+hfK85Ue15UaKabM5i1dK0E8pnE8zlDoYflowJ0RLf4rdO9KTbabF7djEyEVZvFc0s
gdoYGqXM6kLkFdsylVM7QHw1j8/VDXaitSLmGyplTHLLPfX/ZOXpZsY2GwZ4V5u0uay1THU+ZbXC9bn1
owhN6664Wya3MkH60rIfz+3OzFw0Oe3WOpvk59vlk55vfxovuKIt/n3i2xgeT6FoZ6flwbNtAgIYHCJ8
T7rN8rnm/9OHJarUb008X6BRypGQ0rSvkaVphdGCyX0xatEgM/W+HZzDMApGwSggCADehVQ7;

DEFINE LABEL 0
eJwzZ2BgUOPduTaDZ82SDB7J6a28DK0zBe1zS4RDUieKGKWcFitNS5HkKJkml7lIX1Gr9K3ikgIu5aZ8
F1WtUnn1qoYyrXNLgUYwvLc4m5BtlRnb6iEZpB10zX93+DX/GxGSQfoxWqX6Makdm6PqZklFvF/2Mqh0
tbVPyCo1j3NLC1xY5k91mjxpqtOKrk3ODK3ebhH1d7w3VHYFbaiMCTermxa5twlk9tXUc0vZs2NmWha0
dbJUlKaBxPIy3icezZbNcSs/OCe6+v0ykJhzS+aihNbMRSC22k+tXQyjYBSMAoIAANOuUw0;

DEFINE LABEL 1
eJyzYmBgcObrM37Ce8/Ome9S1T7+c0t/CG7YBxRm+KXxuuepyo+pmcqS04UUuhYLKZSuTlTj2HlXXWvX
WV2OnY8M/6x3NHo895HhtSmBOrcyf2lkxjKpdcUVKoSkmsuFpILM+OIUskrQZefa4+5/1m/3/bP+il/p
6it+XYtn+VjP8HY72f3Fqa3zvt29Zjebz9VLbZ4XmTkJJhe4nE144/o+sdVjejrIjCMhPJ5HQpYUNIa2
dc4L2zL5RsTjuT6xIasWJ9xadzX11jr+jOlrXmW+XwZR+7xoeTBHyYNQjhKmxIQ8kNiiX7OPMYyCUTAK
sAIACytnRA;

DEFINE LABEL 2
eJzzY2BgmCiyM8NKcE28M59atBovS9R5TrVoSbadGc8ZGFqfM1yb8oela7Ez35/1L8RlNypJTV8D1MJg
o3G0UF79c7W8OkNrpGbhxE/a82e/0lNb0GzovjDOmGX+d9MfU4vNX/dMsPhcPcFCNgekZ6qT5PReV44S
TnfZnCce09MjfKenX/G7lZkbeCsTJP825uAcn9jSNK44weQdKe8TP6V1xYHEOZsU2ypqnNsPVdxrNixu
yi8uEkx+Xzw/TLEywPtPlZ6XWe33ALParjjJmrMJDZWyOTylz4tA+tZ3B0zI7emv8Oibnn6k/2xC7CS1
6G9T3GOezZLNOTDHu6xurnM7SF32hiprv/VdcWvXt3Vmb+DtY9k8edL17ZMnFezi7QPJP1reFdewJTN2
085HESA+4+/3yxhGwSgYJgAAyGh9tg;

DEFINE LABEL 3
eJzTYmBguCzctGWZRMiqB1JqC06LXZvyhHd2YwbP5+pV3Al5nDx/stR4d2bkiKlFA5UybOJ4v8ybe+fa
GoGmLetEj247LbZkK0i8TIujZLL2veZXetemsBtYz1hgVDer2kRy+gzTwonF5hsqi82PFoLUTXWKmann
alZ33N27LMHLu+yK373mj/4MrUdCnhfFhDflT4tsyheKPlqYGbdlMki94Nc/6/W+/VnPMApGwSigCQAA
46JExA;

DEFINE LABEL 8
eJwzYmBgYOT/o5rBs1j7PKeZ5SYOZ6dgDuvgAk73GG/u94mtvCGpE0VuZeaI7cx4IW6UkiL5KEJJSs/r
sGSE1WkxLQMrwelKjPwhCmq89hpAoxhEzN1jRMwlg8LMeDz3Gs+2UTG8ZKqjl2v0S8PbMFHts1mbymv3
pyoHw5nUjFJA6qUi3GNK/dSie10n+0o67rXd5RBhJel4VCfY+ZZKhnuIgpx3iEKE7w7lUr+jOqV+VdYR
vqnOtd4n3XpdT7p9cWpzAZmx6NfjuQyjYBSMArIAAIj5P7k;

DEFINE LABEL 9
eJwzYmBgWMTXpHVb4KiOjcZRHSY1M0slKfeYRXy55ZWyueVAaQZHo/lhjF51oXe8vwdY+0z2lfNe4drq
weCgaX3P7pZJoU+csXXwf6OuOBmTkNTvpn+yTllxlKxy0yp94vG8CKRfKFrRcXNUadqF6OnpQtFr4oWi
60ILo6/5+8S+dp+dPNvmVaaZJUhdcVGAd3X+/LC4PKBZ+X+yios4StzKtUrtqhLy/lSFpB6qqAvtKCv0
MSw+6ba18KTb9wI9L5C+/b9TzzKMglEwCsgCAI/RSqA;
