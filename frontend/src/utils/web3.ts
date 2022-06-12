import Web3 from 'web3';
import { message } from 'antd';

const web3 = new Web3('http://localhost:8546');

export const init = (callback: any) => {
  //判断用户是否安装MetaMask钱包插件
  if (typeof window?.ethereum === 'undefined') {
    //没安装MetaMask钱包进行弹框提示
    message.warning('请安装MetaMask');
  } else {
    //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
    window?.ethereum
      .enable()
      .catch(function (reason: any) {
        //如果用户拒绝了登录请求
        if (reason === 'User rejected provider access') {
          // 用户拒绝登录后执行语句；
          message.warning('User rejected provider access');
        } else {
          // 本不该执行到这里，但是真到这里了，说明发生了意外
          message.warning('There was a problem signing you in');
        }
      })
      .then(function (accounts: any) {
        let currentProvider = web3?.currentProvider;
        if (accounts?.length) {
          web3.setProvider(currentProvider);
          //如果用户同意了登录请求，你就可以拿到用户的账号
          web3.eth.defaultAccount = accounts[0];

          //这里返回用户钱包地址
          callback(accounts[0]);
        }
      });
  }
};
