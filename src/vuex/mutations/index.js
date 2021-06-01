export default {
  SET_GLOBAL_ERROR(state, error) {
    state.globalError = error
  },

  SET_WEB3_IS_CONNECTED(state, isConnected) {
    state.web3.isConnected = isConnected
  },

  SET_WEB3_IS_APPROVED(state, isApproved) {
    state.web3.isApproved = isApproved
  },

  SET_WEB3_CHAIN_ID(state, chainId) {
    state.web3.chainId = chainId
  },

  SET_WEB3_INSTANCE(state, web3) {
    state.web3.instance = web3
  },

  SET_WEB3_USER_ADDRESS(state, addy) {
    state.web3.address = addy
  },

  SET_WEB3_MAIN_BALANCE(state, balance) {
    state.web3.mainCurrencyBalance = balance
  },

  SET_XLM_SECRET_SEED(state, seed) {
    state.xlm.xlmSecretSeed = seed
  },

  SET_HASHES(state, hashes) {
    state.hashes = hashes
  },
}
