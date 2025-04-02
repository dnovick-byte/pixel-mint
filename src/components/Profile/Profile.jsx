import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export const Profile = () => {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ 
        name: ensName,
        chainId: 1
    })


    return (
        <div>
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
        <button onClick={() => disconnect()}>Disconnect</button>
        </div>
    )
}