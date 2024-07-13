// src/GameGrid.js
import React from "react";
import { Grid, Card, CardMedia, Container } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "@remix-run/react";

const games = [
  {
    src: "imgs/twitter-card.jpg",
    alt: "Game 1",
    link: "/popcat",
    large: false,
  },
  { src: "imgs/chohan.png", alt: "Game 2", link: "/chohan", large: true },
  { src: "imgs/basket.png", alt: "Game 3", link: "/basket" },
  // { src: "imgs/suika.png", alt: "Game 4", link: "/chohan" },
  // { src: "imgs/penguin.png", alt: "Game 5", link: "/chohan" },
  { src: 'imgs/wip.png', alt: 'Game4',link: "/bird" },
  { src: 'imgs/wip.png', alt: '' },
  // { src: 'link-to-image8', alt: 'Game 8' },
  // { src: 'link-to-image9', alt: 'Game 9' },
];

const StyledContainer = styled(Container)({
  // backgroundColor: '#e0f7fa',
  padding: "20px",
  // maxWidth: "100px"
  // height: '90vh',
});

const StyledCard = styled(Card)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  borderRadius: "15px",
});

const LargeStyledCard = styled(StyledCard)({
  height: "220px", // 큰 카드의 높이 조정
});

const GameGrid = () => {
  return (
    <StyledContainer
      maxWidth="xs"
    >
      <Grid container spacing={2}>
        {games.map((game, index) => (
          <Grid item xs={game.large ? 8 : 4} key={index} 
            style={{
              // margin:0,
              
            }}
          >
            {game.large ? (
              <LargeStyledCard>
                <LargeGameCard
                  image={game.src}
                  alt={game.alt}
                  link={game.link}
                />
              </LargeStyledCard>
            ) : (
              <StyledCard>
                <GameCard image={game.src} alt={game.alt} link={game.link} />
              </StyledCard>
            )}
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

function GameCard({ image, alt, link }) {
  return (
    <Link
      to={link}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={alt}
        style={{ height: "100%" }}
      />
    </Link>
  );
}

function LargeGameCard({ image, alt, link }) {
  return (
    <Link
      to={link}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={alt}
        style={{ height: "100%" }}
      />
    </Link>
  );
}

export default GameGrid;
