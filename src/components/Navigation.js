import { Link } from 'react-router-dom';

function Navigation() {
return (
<nav className="bg-gray-100 pt-6 text-center">
<Link to="/">一覧</Link> | <Link to="/add">タスク追加 </Link>
<Link to="/delete">タスク削除 </Link>
<Link to="/find">🔍 検索</Link>
<Link to="/edit">編集</Link>
</nav>
);
}

export default Navigation;