import logo from '../JA.png';
import '../css/Dashboard.css';
import '../css/Suite.css';
import Button from '../components/Button';
import Input from '../components/Input';
import Connection from '../components/Connection';

function Dashboard() {
  return (
    <div className="App">
      <main className="App-fundo-dashboard">
          <Connection/>
      </main>
    </div>
  );
}

export default Dashboard;