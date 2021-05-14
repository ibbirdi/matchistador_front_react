import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

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
    const randQuote = () => {
      if (citationIndex < citations.length - 1) {
        setCitationIndex(citationIndex + 1);
      } else {
        setCitationIndex(0);
      }
    };
    const int = setInterval(randQuote, 7000);
    return () => {
      clearInterval(int);
    };
  }, [citationIndex, citations.length]);

  return (
    <>
      <Fade>
        <div className="Quotes">
          <Fade top cascade spy={citationIndex}>
            {citations[citationIndex].quote}
          </Fade>
          <Fade bottom cascade spy={citationIndex}>
            <div className="author">{citations[citationIndex].author}</div>
          </Fade>
        </div>
      </Fade>
    </>
  );
};

export default Quotes;
