import React, { useState, useEffect } from 'react';

const Quotes = () => {
  const [citationIndex, setCitationIndex] = useState(0);
  const citations = [
    {
      quote: 'La musique est la langue des émotions',
      author: 'Emmanuel Kant',
    },
    {
      quote: "L'amour est un art, comme la musique",
      author: 'Pierre Louÿs',
    },
    {
      quote: "La musique commence là où s'arrête le pouvoir des mots",
      author: 'Richard Wagner',
    },
    {
      quote: "Notre musique, c'est la bande originale de notre vie",
      author: 'Jonathan Luquet',
    },
  ];

  useEffect(() => {
    const quotesLength = citations.length;
    const int = setInterval(() => {
      citationIndex < quotesLength - 1
        ? setCitationIndex(citationIndex + 1)
        : setCitationIndex(0);
    }, 5000);
    return () => {
      clearInterval(int);
    };
  });

  return (
    <>
      <div className="Quotes">
        <span className="symbol">“ </span>
        {citations[citationIndex].quote} <span className="symbol">”</span>
        <div className="author">{citations[citationIndex].author}</div>
      </div>
    </>
  );
};

export default Quotes;
