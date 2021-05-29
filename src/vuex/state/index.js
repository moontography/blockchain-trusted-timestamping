export default {
  globalError: null,
  activeNetwork: localStorage.activeNetwork || 'eth',

  web3: {
    instance: null,
    isConnected: false,
    isApproved: false,
    address: '',
    mainCurrencyBalance: '',
  },

  eth: {
    addresses: {
      mtgy: '0xd4cFed5e7578c32d17158eef3cf35990f811eba9',
      trustedTimestamping: '0x3f981c658E12d18ca4cFFbdd03E9980A2dCF94d6',
    },
  },

  xlm: {
    xlmPublicKey: 'GACH6YMYFZ574FSGCV7IJXTGETEQL3DLQK64Z6DFGD57PZL5RH6LYOJT',
    xlmSecretSeed: localStorage.xlmSeed || null,
    usdToSend: '2.00',
  },
}
