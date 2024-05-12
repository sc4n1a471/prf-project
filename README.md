# Ez lenni prf-project

Kis leírás a projektről, hogy egyszerűbb legyen átnézni, ha nagyon szeretnéd

Ez egy saját témával készült dolog, egy már meglévő saját projekthez fogom használni a frontendet, így a backendet 1-1-ben kifogom dobni, mivel már Go-ban korábban meg lett írva. Emiatt a backend részen több dolog van, amit meglehetne normálisabban csinálni (pl tranzakciókat használni a műveletekhez vagy több helyen van TODO/sima leírás, hogy az ott nem úgy van valójában a prod verzióban).

A frontendet se akartam nagyon teletömni félkész megoldásokkal (bár 1-2 helyen sikerült, pl a css részét teljesen újra kéne rendezni), így ez egy lite verziója a production környezetnek (több helyen csak adatot létrehozni/lekérni tudunk, módosítani/törölni nem)

Amik fontosak lehetnek, hogy backend oldalon mind a 4 művelet normálisan megvan csinálva minden adattípusra, auth esetén van admin/guest kezelés. Regisztrálni a hagyományos értelemben nem lehet, az elején egy admin usert egy post kéréssel kell létrehozni a `/users/create-admin` endpointra, ahol a bodyban sima JSON-ben email/password/name(optional)-t kell megadni. Más usereket az admin tud létrehozni saját köréhez, ezek csak ehhez az adminhoz tartoznak. Admint is tud létrehozni.

Frontenden mindent lehet létrehozni/listázni, de csak a bevételt lehet törölni és módosítani. Auth kezelés meg minden egyéb is működik.

Ha van időd/kedved bogarászni, megérteni a rendszert, nem tartalak vissza, GLHF. 😉

## Deploy/Demo infók
- [https://prf.sc4n1a.hu](https://prf.sc4n1a.hu)
- user2@test.test / ezLenniJelszo
- vannak teszt adatok, lehet szórakozni vele, nyomkodni össze-vissza. Ha valamilyen csoda folytán megnyekken valamelyik rendszer, akkor az kellemetlen, idővel újraindítom, ha épp észreveszem. *idhővel...*
- *tessék nem kinyírni a szervert...*
