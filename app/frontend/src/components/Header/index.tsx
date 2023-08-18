import styles from './Header.module.css';

function Header() {
  return(
    <header className={styles.header}>
      <span>Dois Pedaços</span>
      <nav>
        <a href= ''>Home</a>
        <a href="/ingredients">Ingredientes</a>
        <a href= '/recipes'>Receitas</a>
        <a href= '/stock'>Stock</a>
        <a href= ''>Saídas</a>
      </nav>
    </header>
  )
}

export default Header;