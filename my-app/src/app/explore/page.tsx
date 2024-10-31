"use client"
import React, { useState, useEffect } from 'react';
import { Search, Award, Gift, UserPlus, Users, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { ethers } from 'ethers'
import { BrowserProvider } from 'ethers';
import youXiangToken from "../contractInfo/youXiangTok.json"

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface Friend {
  id: number;
  name: string;
  mutual: number;
  interests: string[];
}

interface ModalProps {
  onClose: () => void;
}

interface FriendRequestModalProps extends ModalProps {
  friend: Friend | null;
}

declare global {
  interface Window {
    ethereum?: {
      isMetaMask: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

const explore = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isRewardModalOpen, setIsRewardModalOpen] = useState<boolean>(false);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const withdraw = async () => {
    const claimAmt = 50;
    const contractAddress = "0x3486e41C499932DD8d395b6aF96FDebEC2Fd8d92"
    const provider = new BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("Wallet Address:", address);
    const humorTokenContract = new ethers.Contract(contractAddress, youXiangToken.abi, signer)
    // mint();
    console.log(claimAmt, "========inside withdraw===")

    // await (await humorTokenContract.donate(address, "0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe", ethers.parseUnits(claimAmt.toString(), 18))).wait();
    await (await humorTokenContract.mint(address, ethers.parseUnits(claimAmt.toString(), 18))).wait();

  }
  const donate = async () => {
    const claimAmt = 5;
    const contractAddress = "0x3486e41C499932DD8d395b6aF96FDebEC2Fd8d92"
    const provider = new BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("Wallet Address:", address);
    const humorTokenContract = new ethers.Contract(contractAddress, youXiangToken.abi, signer)
    // mint();
    console.log(claimAmt, "========inside withdraw===")

    await (await humorTokenContract.transfer("0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe", ethers.parseUnits(claimAmt.toString(), 18))).wait();
    // await (await humorTokenContract.mint(address, ethers.parseUnits(claimAmt.toString(), 18))).wait();

  }

  // Sample friend suggestions data
  const friendSuggestions: Friend[] = [
    { id: 1, name: "Alex Chen", mutual: 12, interests: ["Photography", "Travel"] },
    { id: 2, name: "Sarah Wilson", mutual: 8, interests: ["Music", "Art"] },
    { id: 3, name: "James Lee", mutual: 15, interests: ["Technology", "Gaming"] },
    { id: 4, name: "Emma Davis", mutual: 6, interests: ["Books", "Cooking"] }
  ];

  const handleFriendRequest = (friend: Friend): void => {
    setSelectedFriend(friend);
    setIsFriendModalOpen(true);
  };

  // Modal Components
  const RewardModal: React.FC<ModalProps> = ({ onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="bg-zinc-900 p-8 rounded-lg relative z-10 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <Gift size={48} className="mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl mb-2" style={{ fontFamily: 'Raleway' }}>Claim Daily Reward</h2>
          <p className="text-white/60" style={{ fontFamily: 'Raleway' }}>
            You've earned 50 Friend Tokens for logging in today!
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontFamily: 'Raleway' }}>Daily Streak</span>
            <span className="text-green-400">3 Days</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-green-400 h-full rounded-full" style={{ width: '43%' }} />
          </div>
          <p className="text-sm text-white/60 mt-2" style={{ fontFamily: 'Raleway' }}>
            4 more days until bonus reward!
          </p>
        </div>

        <button
          onClick={() => {
            onClose();
            withdraw();
          }}
          className="w-full py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
          style={{ fontFamily: 'Raleway' }}
        >
          Claim Reward
        </button>
      </div>
    </div>
  );

  const FriendRequestModal: React.FC<FriendRequestModalProps> = ({ friend, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="bg-zinc-900 p-8 rounded-lg relative z-10 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <UserPlus size={48} className="mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl mb-2" style={{ fontFamily: 'Raleway' }}>Send Friend Request</h2>
          <p className="text-white/60" style={{ fontFamily: 'Raleway' }}>
            Would you like to send a friend request to {friend?.name}?
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <Users size={20} className="text-white/60" />
            <span className="text-white/60">
              {friend?.mutual} mutual friends
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
            style={{ fontFamily: 'Raleway' }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle friend request logic here
              donate()
              onClose();
            }}
            className="flex-1 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
            style={{ fontFamily: 'Raleway' }}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Custom cursor */}
      <div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-50"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="text-xl tracking-wider" style={{ fontFamily: 'Pinyon Script' }}>
            <Link href="/">FRIEND CHAIN</Link>

          </div>
          <div className="space-x-8" style={{ fontFamily: 'Raleway' }}>
            <a href="#explore" className="hover:opacity-50 transition-opacity tracking-wider">EXPLORE</a>
            <a href="#rewards" className="hover:opacity-50 transition-opacity tracking-wider">REWARDS</a>
            {/* <a href="#profile" className="hover:opacity-50 transition-opacity tracking-wider">PROFILE</a> */}
            {!walletConnected ? (
              <button
                onClick={connectWallet}
                className="hover:opacity-50 transition-opacity tracking-wider"
              >
                CONNECT WALLET
              </button>
            ) : (
              <button className="hover:opacity-50 transition-opacity tracking-wider">
                <span className="text-white text-xs">{walletAddress.slice(0, 5) + '...' + walletAddress.slice(-4)}</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 px-6 max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="relative mb-16">
          <input
            type="text"
            placeholder="Search for new friends..."
            className="w-full bg-transparent border-b border-white/20 py-4 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors"
            style={{ fontFamily: 'Raleway' }}
          />
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/60" size={20} />
        </div>

        {/* Daily Rewards Section */}
        <div className="mb-16 bg-white/5 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wider" style={{ fontFamily: 'Raleway' }}>
              Daily Login Rewards
            </h2>
            <button
              onClick={() => setIsRewardModalOpen(true)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <Gift size={24} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center ${i <= 2 ? 'bg-white/10' : 'bg-white/5'
                  } relative`}
              >
                <Award size={24} className={i <= 2 ? 'text-white' : 'text-white/40'} />
                {i <= 2 && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Friend Suggestions */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl tracking-wider mb-8" style={{ fontFamily: 'Raleway' }}>
              Suggested Friends
            </h2>
            <div className="space-y-6">
              {friendSuggestions.map((friend) => (
                <div key={friend.id} className="bg-white/5 rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg mb-2" style={{ fontFamily: 'Raleway' }}>{friend.name}</h3>
                    <p className="text-sm text-white/60 mb-2">
                      <Users className="inline mr-2" size={16} />
                      {friend.mutual} mutual friends
                    </p>
                    <div className="flex gap-2">
                      {friend.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white/10 px-3 py-1 rounded-full"
                          style={{ fontFamily: 'Raleway' }}
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleFriendRequest(friend)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <UserPlus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Categories */}
          <div>
            <h2 className="text-2xl tracking-wider mb-8" style={{ fontFamily: 'Raleway' }}>
              Explore Categories
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Gaming', 'Art & Design', 'Music', 'Technology', 'Travel', 'Books'].map((category) => (
                <div
                  key={category}
                  className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg" style={{ fontFamily: 'Raleway' }}>{category}</span>
                    <ArrowRight
                      size={20}
                      className="transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                  <p className="text-sm text-white/60">
                    Discover friends with similar interests
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`
        }}
      />

      {/* Modals */}
      {isRewardModalOpen && <RewardModal onClose={() => setIsRewardModalOpen(false)} />}
      {isFriendModalOpen && <FriendRequestModal friend={selectedFriend} onClose={() => setIsFriendModalOpen(false)} />}
    </div>
  );
};

export default explore;

// function setWalletAddress(arg0: any) {
//     throw new Error('Function not implemented.');
// }
// function setWalletConnected(arg0: boolean) {
//     throw new Error('Function not implemented.');
// }

