import BigNumber from 'bignumber.js'
import Web3Modal from '../../factories/web3/Web3Modal'
import MTGY from '../../factories/web3/MTGY'
import TrustedTimestamping from '../../factories/web3/TrustedTimestamping'

export default {
  async init({ commit, dispatch, state }, reset = false) {
    try {
      if (state.web3 && state.web3.isConnected && !reset) return
      if (state.activeNetwork === 'xlm') return

      const web3Mod = Web3Modal()
      const web3 = await web3Mod.connect()
      commit('SET_WEB3_INSTANCE', web3)

      const isConnected = true
      commit('SET_WEB3_IS_CONNECTED', isConnected)
      if (!isConnected) {
        return commit(
          'SET_GLOBAL_ERROR',
          new Error(`User not connected. Please connect to your wallet.`)
        )
      }

      const [accountAddy] = await web3.eth.getAccounts()
      commit('SET_WEB3_USER_ADDRESS', accountAddy)

      await dispatch('ethCheckApprovalStatusForTokenContract')

      const trustedTimestampingAddress =
        state[state.activeNetwork].addresses.trustedTimestamping
      const ttCont = TrustedTimestamping(web3, trustedTimestampingAddress)
      const hashes = await ttCont.methods
        .getHashesFromAddress(accountAddy)
        .call()
      console.log('HASHES', hashes)
    } catch (err) {
      commit('SET_GLOBAL_ERROR', err)
    }
  },

  async ethCheckApprovalStatusForTokenContract({ state, commit }) {
    const userAddy = state.web3.address
    if (!userAddy) {
      commit('SET_WEB3_IS_CONNECTED', false)
      commit('SET_WEB3_IS_APPROVED', false)
      return
    }

    const web3 = state.web3.instance
    const mtgyAddress = state[state.activeNetwork].addresses.mtgy
    const trustedTimestampingAddress =
      state[state.activeNetwork].addresses.trustedTimestamping
    const contract = MTGY(web3, mtgyAddress)
    const ttCont = TrustedTimestamping(web3, trustedTimestampingAddress)
    const [timestampAllowance, currentCost] = await Promise.all([
      contract.methods.allowance(userAddy, trustedTimestampingAddress).call(),
      ttCont.methods.cost().call(),
    ])
    const isApprovedAlready = new BigNumber(timestampAllowance).gte(currentCost)
    commit('SET_WEB3_IS_APPROVED', isApprovedAlready)
  },

  async ethApproveTokenContract({ state, commit }) {
    try {
      const web3 = state.web3.instance
      const userAddy = state.web3.address
      const mtgyAddress = state[state.activeNetwork].addresses.mtgy
      const trustedTimestampingAddress =
        state[state.activeNetwork].addresses.trustedTimestamping
      const mtgyCont = MTGY(web3, mtgyAddress)
      await mtgyCont.methods
        .approve(trustedTimestampingAddress, 5000)
        .send({ from: userAddy })
      commit('SET_WEB3_IS_APPROVED', true)
    } catch (err) {
      commit('SET_WEB3_IS_APPROVED', false)
      commit('SET_GLOBAL_ERROR', err)
    }
  },

  async sendTxn({ state }, { hash, fileName, fileSize }) {
    const userAddy = state.web3.address
    const trustedTimestampingAddress =
      state[state.activeNetwork].addresses.trustedTimestamping
    const web3Mod = Web3Modal()
    const web3 = await web3Mod.connect()
    const ttCont = TrustedTimestamping(web3, trustedTimestampingAddress)
    await ttCont.methods
      .storeHash(hash, fileName, fileSize)
      .send({ from: userAddy })

    // TODO refreshes hashes again
  },
}
