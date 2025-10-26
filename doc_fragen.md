- hoi und graph schrift dunkler, wenn drüber hoovern
- farbe rotierende yang icons in yangfarbe
- zufällig link aus den drei auswahlen raus. soll einfach zufälli öffnen?
- site nav und buttons unten an bildschirm heften (damit die nicht hoch und runterspringen)


Schriften:
- Dancing Script (bian)
- amatic (yang)
- josefine slab (yin)
- diastema (haupttitel, im hintergrund - eher als hintergrudnbild?)


können die buttons und die site vaigation unten an den bildschirm gekoppelt werden, sodas die nicht mit den verschiedenen inhaltsgrössen rumspringen? es wäre auch cool, wenn von der site navigation nur die titelleiste zu sehen wäre, und man den graph sieht, wennman runterscrollt


---

/* Seitenstreifen - Sättigung 40%, Helligkeit 85% */
--yang-bg: hsla(50, 60%, 65%, 1.00);    /* Gelb */
--bian-bg: hsla(210, 60%, 65%, 1);   /* Blau */
--yin-bg: hsla(330, 60%, 65%, 1);    /* Rosa */
--fluur-bg: hsla(0, 0%, 85%, 1.00);  /* Grün/Türkis */

  /* Hauptfelder - Sättigung 60%, Helligkeit 65% */
  --yang-bg: hsla(50, 60%, 65%, 0.4);    /* Gelb */
  --bian-bg: hsla(210, 60%, 65%, 0.4);      /* Blau */
  --yin-bg: hsla(330, 60%, 65%, 0.4);       /* Rosa */
  --fluur-bg: hsla(0, 0%, 85%, 0.4);     /* Neutral Grau */
  
  /* Unterfelder - Gleiche Farbtöne, 20% Opacity */
  --yang-inner: hsla(50, 60%, 65%, 0.2);
  --bian-inner: hsla(210, 60%, 65%, 0.2);
  --yin-inner: hsla(330, 60%, 65%, 0.2);
  --fluur-inner: hsla(0, 0%, 85%, 0.20);