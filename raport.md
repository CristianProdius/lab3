<h1 align="center">Course: CS.</h1>
<h4 align="center">Technical University of Moldova  </h4>
<h4 align="center">FCIM   |   UTM   |   Autumn 2024</h4><br><br>

<p align=center>                           
  <img align=center style="height: 50%;
  width: 50%; " src="https://utm.md/wp-content/uploads/2020/12/logo-sigla.png" />
</p>
</br><p align=right>  
p. CS
</p>
<p align="right" > student FAF-223, Cristian Prodius</p>
</br><p align=center>  
Chisinau 2024
</p>
<hr></br></br></br>

<h1 align='center'> 
Laboratory work nr. 3
</h1>

## Introducere

Această lucrare prezintă implementarea cifrului Vigenère pentru limba română, utilizând un alfabet de 31 de litere codificate de la 0 la 30. Implementarea a fost realizată folosind Next.js și Tailwind CSS.

## Obiectivele Lucrării

1. Implementarea cifrului Vigenère pentru alfabetul român (31 litere)
2. Codificarea literelor folosind numerele 0-30
3. Validarea input-ului utilizatorului
4. Procesarea textului conform cerințelor
5. Crearea unei interfețe web interactive

## Implementare

# Model Matematic

Cifrul Vigenère folosește următoarele formule:

# Criptare:

```
ci = (mi + ki) mod 31
```

# Decriptare:

```
mi = (ci - ki + 31) mod 31
```

## Funcții Principale

# Validarea Mesajului:

```const isValidMessage = (message: string): boolean => {
  const validChars = new Set(
    "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZaăâbcdefghiîjklmnopqrsștțuvwxyz"
  );
  return Array.from(message).every((char) => validChars.has(char));
};
```

# Pregătirea Mesajului:

```const prepareMessage = (message: string): string => {
  return message
    .replace(/\s/g, '')
    .toUpperCase()
    .split('')
    .filter(char => alphabet.includes(char))
    .join('');
};

```

# Generarea Cheii:

```const generateKey = (msg: string, key: string): string => {
  if (msg.length === key.length) return key;
  const repeatedKey = key.repeat(Math.ceil(msg.length / key.length));
  return repeatedKey.slice(0, msg.length);
};
```

## Concluzii

Implementarea satisface toate cerințele specificate în sarcina de laborator:
Suportă alfabetul român complet (31 litere)
Implementează corect codificarea numerică (0-30)
Oferă validări robuste pentru input
Procesează textul conform specificațiilor
Prezintă o interfață utilizator intuitivă
