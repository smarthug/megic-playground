import useGame from "./stores/useGame";

const Interface = () => {
  const points = useGame((state) => state.score);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '1.25rem' }}>
      <h1>{points} points</h1>
    </div>
  );
};

export default Interface;

//<div style="position: fixed; top: 0; left: 0; width: 100%; z-index: 999; display: flex; justify-content: center; align-items: center; color: #fff; font-size: 1.25rem;">
