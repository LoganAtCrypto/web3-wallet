import { Layout } from '../components/Layout';
import { SolanaWalletCardList } from '../components/SolanaWalletCardList';
import { WalletCardListContainer } from '../components/WalletCardListContainer';

export default function Home() {
  return (
    <Layout>
      <WalletCardListContainer>
        <SolanaWalletCardList />
      </WalletCardListContainer>
    </Layout>
  );
}