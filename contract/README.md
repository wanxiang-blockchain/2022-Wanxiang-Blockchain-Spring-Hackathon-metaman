## 1. 部署万纳链 Venachain

- Github repo: https://github.com/Venachain/Venachain
- 开发文档: https://venachain-docs.readthedocs.io/zh/latest/
- 部署文档: https://venachain-docs.readthedocs.io/zh/latest/documents/quick/deploy.html

### 1.1 releases包部署

```bash
wget https://github.com/Venachain/Venachain/releases/download/v1.0.1/Venachain_linux_amd64_v1.0.1.tar.gz
tar -zxvf Venachain_linux_amd64_v1.0.1.tar.gz
```

### 1.2 容器内部署单节点

```bash
#新建容器
docker run -it -v ~/install/tmp/:/opt -p 6791:6791 --name venachain ubuntu:20.04
apt update
apt install curl

	#二次进入容器
docker container start venachain
docker exec -it venachain bash
 
cd /opt/linux
export WORKSPACE=./
cd ${WORKSPACE}/scripts/

# 首次部署并启动节点
./venachainctl.sh one
	# 二次启动节点
./venachainctl.sh start -n 0

# 查看节点状态
./venachainctl.sh status -n 0

# 停止
./venachainctl.sh stop -n 0
# 停止清数据
./venachainctl.sh clear -a
```

### 1.3 与链交互

```bash
cd ${WORKSPACE}/scripts/
./venachainctl.sh console -n 0

eth.accounts
eth.blockNumber
#测试一笔交易
eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[0]})
#查看交易回执
eth.getTransactionReceipt("0xcb1d67354698038e23fe736fd0b6cdd51dd4c7bb3927fdc4fd1774aab06b4040")
#查看交易池状态
txpool.status

#解锁 (默认密码 0)
personal.unlockAccount(eth.accounts[0])
personal.unlockAccount(eth.accounts[0], "0")

```

## 2. 部署NFT合约 MetaMan

注意: 部署前先解锁本地的钱包, 通过命令 `personal.unlockAccount(eth.accounts[0], "0")`

### 2.1 在remix中编译合约并部署

![image-20220611234937481](https://s2.loli.net/2022/06/11/jt4uRylZMTgFwXJ.png)

![image-20220611235015699](https://s2.loli.net/2022/06/11/M1dLcbv8f5rwPXR.png)

![image-20220611235102450](https://s2.loli.net/2022/06/11/qVh5kEvbUxoHfJn.png)

![image-20220611235127861](https://s2.loli.net/2022/06/11/V8GCQJ5e6bgRDKP.png)

![image-20220611235232526](https://s2.loli.net/2022/06/11/1bB3sTClLrZUh5F.png)

![image-20220611235254066](https://s2.loli.net/2022/06/11/CsqHztBVMFbS8lD.png)

### 2.2 部署成功

![image-20220611235721502](https://s2.loli.net/2022/06/12/2FM6TvAKizZOl85.png)

### 2.3 在命令行中查看

看到部署的**合约地址是: `0xde5faa436bc5e8ff29cbfe9c48a52fd860260d68`**

![image-20220611235855700](https://s2.loli.net/2022/06/12/mklDH3TxwvCWBg1.png)

## 3. 铸造一个数字人 NFT

### 3.0 为数字人生成出生证明

*未具体列出如果使用STA生成出生证明的步骤, 日后再详细说明*

```json
{
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "8faba747-8899-4dd6-8925-be061936a90d",
    "issuanceDate": 1652258590771,
    "expirationDate": 1668154143000,
    "credentialSubject": {
      "id": "did:wx::85766e9e-abbc-4c00-b5f4-0ee9ebf6d90a",
      "shortDescription": "string",
      "longDescription": "string",
      "type": "string",
      "data": "{ \"owner\":\"did:vena:aaaaaaaa-452f-4440-aabb-6ba8b47cd8ef\",\"creator\":\"did:vena:bbbbbbbb-452f-4440-aabb-6ba8b47cd8ef\",\"metaman\":\"did:vena:cccccccc-452f-4440-aabb-6ba8b47cd8ef\" }"
    },
    "revocation": {
      "type": "SimpleRevocationListV1"
    },
    "proof": {
      "encryptType": "Secp256k1",
      "creator": "did:pnid:cid:7f8ca8982f6cc6e8ea087bd9457ab8024bd2/1",
      "signatureValue": "8fdfe8dcfa3f306edb088050bd1ed3fe6e392d150f2fbf1a55d96a02090d273c29fbd25874e1fd5c7b50b84a3fb05698dbb56ee082c0f5ae3447f17e0a248a1be9a4d47ae5aae688da7755e8901a4d7364da6fdc91e7c188d8f5711ebfd796e8e04dea591276022c91323b1a05acada9d786751385f5087d47fd042fa4531b25f56456"
    }
  }
```



### 3.1 先将数字人的资源传到IPFS上

- 2D形象
- 出生证明 (STA颁发)
- 自我介绍的视频

![image-20220612002154214](https://s2.loli.net/2022/06/12/lBIaA4yiDK1FQLp.png)

### 3.2 填写并将NFT对应的元数据文件传到IPFS上

```json
{
     "name": "0xJessica",
     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
     "image": "https://ipfs.io/ipfs/QmYadFKVgcVtuTGBA6KvuVcn4iP58ds5LkYGGiRWHwwmWm",
     "attributes": [
       {
		 "display_type": "date", 
         "trait_type": "birth_cert", 
         "value": "https://ipfs.io/ipfs/QmefmjSguNLuwXNiYtp7DNENYWbsSd4i5rKtxJbNEx7LFQ"
       },
       {
         "display_type": "date", 
         "trait_type": "birthday", 
         "value": 1546360800
       },{
         "display_type": "meta", 
		 "trait_type": "2d", 
         "value": "https://ipfs.io/ipfs/QmefmjSguNLuwXNiYtp7DNENYWbsSd4i5rKtxJbNEx7LFQ"
       },
       {
		 "display_type": "meta", 
         "trait_type": "3d", 
         "value": "https://ipfs.io/ipfs/QmPAPbhFz5x2CMmNsq9XbguucTtV5vM2znDtn3x1rYyWh4"
       }
     ]
}
```

![image-20220612002254270](https://s2.loli.net/2022/06/12/UxO8gdVo6SPiBlJ.png)

### 3.3 铸造一个数字人NFT

为我的测试地址 `0xFb66befF2B2601dB91Af45cd3c77706a5D4D13f7` 铸造一个数字人NFT, tokenURI使用ipfs上的元数据文件`https://ipfs.io/ipfs/QmRRSbqZpEQ31Kw6mfH6oDt3ZxSjup38dUAJJUXq2csLzq`

![image-20220612002426694](https://s2.loli.net/2022/06/12/kpj7tCUz9XOIixb.png)

铸造成功 (我铸造了两次)

![image-20220612002905994](https://s2.loli.net/2022/06/12/EfxO3HWCzjMNVDJ.png)

### 3.4 查询NFT token的URI

![image-20220612003147528](https://s2.loli.net/2022/06/12/FXzZ5OyjiqC8auE.png)

### 3.5 MetaMask中查看

![image-20220612003309475](https://s2.loli.net/2022/06/12/MrdXG1Tu3UwbhnD.png)

![image-20220612003408962](https://s2.loli.net/2022/06/12/CJQx2de6MThkSs8.png)

## 4. 在浏览器中查看

### 4.1 看元数据

https://ipfs.io/ipfs/QmRRSbqZpEQ31Kw6mfH6oDt3ZxSjup38dUAJJUXq2csLzq

### 4.2 看虚拟人的资源

- 2D形象

  https://ipfs.io/ipfs/QmYadFKVgcVtuTGBA6KvuVcn4iP58ds5LkYGGiRWHwwmWm

- 出生证明 (STA颁发)

  https://ipfs.io/ipfs/QmefmjSguNLuwXNiYtp7DNENYWbsSd4i5rKtxJbNEx7LFQ

- 自我介绍的视频

  https://ipfs.io/ipfs/QmPAPbhFz5x2CMmNsq9XbguucTtV5vM2znDtn3x1rYyWh4



