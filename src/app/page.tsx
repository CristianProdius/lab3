"use client";
import { useState } from "react";

export default function Home() {
  const [choice, setChoice] = useState<"1" | "2">("1");
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const alphabet = "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ";

  const isValidMessage = (message: string): boolean => {
    const validChars = new Set(
      "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZaăâbcdefghiîjklmnopqrsștțuvwxyz"
    );
    return [...message].every((char) => validChars.has(char));
  };

  const prepareMessage = (message: string): string => {
    return message
      .replace(/\s/g, "")
      .toUpperCase()
      .split("")
      .filter((char) => alphabet.includes(char))
      .join("");
  };

  const generateKey = (msg: string, key: string): string => {
    if (msg.length === key.length) return key;
    const repeatedKey = key.repeat(Math.ceil(msg.length / key.length));
    return repeatedKey.slice(0, msg.length);
  };

  const encryptVigenere = (msg: string, key: string): string => {
    const generatedKey = generateKey(msg, key);
    return msg
      .split("")
      .map((char, i) => {
        if (!alphabet.includes(char)) return char;

        const encryptedIndex =
          (alphabet.indexOf(char) + alphabet.indexOf(generatedKey[i])) % 31;
        return alphabet[encryptedIndex];
      })
      .join("");
  };

  const decryptVigenere = (msg: string, key: string): string => {
    const generatedKey = generateKey(msg, key);
    return msg
      .split("")
      .map((char, i) => {
        if (!alphabet.includes(char)) return char;

        const decryptedIndex =
          (alphabet.indexOf(char) - alphabet.indexOf(generatedKey[i]) + 31) %
          31;
        return alphabet[decryptedIndex];
      })
      .join("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult("");

    if (!isValidMessage(message)) {
      setError(
        "Mesajul conține caractere nepermise. Folosiți doar litere românești (A-Z, Ă, Â, Î, Ș, Ț)."
      );
      return;
    }

    if (key.length < 7) {
      setError("Cheia trebuie să aibă cel puțin 7 caractere.");
      return;
    }

    const preparedMessage = prepareMessage(message);
    const processedKey = prepareMessage(key);

    if (choice === "1") {
      setResult(encryptVigenere(preparedMessage, processedKey));
    } else {
      setResult(decryptVigenere(preparedMessage, processedKey));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Cifrul Vigenère (Alfabetul Român)
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Operație
            </label>
            <select
              value={choice}
              onChange={(e) => setChoice(e.target.value as "1" | "2")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="1">Criptare</option>
              <option value="2">Decriptare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cheie (minim 7 caractere)
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Introduceți cheia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {choice === "1" ? "Mesaj de criptat" : "Mesaj de decriptat"}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Introduceți mesajul"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {choice === "1" ? "Criptează" : "Decriptează"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">
              {choice === "1" ? "Mesaj criptat:" : "Mesaj decriptat:"}
            </h2>
            <div className="mt-2 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700 break-all font-mono">{result}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
