import hre from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { Signers } from "../types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Hypnosis", function () {
    beforeEach(async function () {
      // Deploy libraries
      let accessoryDetailFactory = await hre.ethers.getContractFactory("AccessoryDetail");
      let backgroundDetailFactory = await hre.ethers.getContractFactory("BackgroundDetail");
      let bodyDetailFactory = await hre.ethers.getContractFactory("BodyDetail");
      let earringsDetailFactory = await hre.ethers.getContractFactory("EarringsDetail");
      let expressionDetailFactory = await hre.ethers.getContractFactory("ExpressionDetail");
      let eyebrowDetailFactory = await hre.ethers.getContractFactory("EyebrowDetail");
      let eyesDetailFactory = await hre.ethers.getContractFactory("EyesDetail");
      let hairDetailFactory = await hre.ethers.getContractFactory("HairDetail");
      let mouthDetailFactory = await hre.ethers.getContractFactory("MouthDetail");
      let noseDetailFactory = await hre.ethers.getContractFactory("NoseDetail");
      let tatooDetailFactory = await hre.ethers.getContractFactory("TatooDetail");

      let accessoryDetail = await accessoryDetailFactory.deploy();
      let backgroundDetail = await backgroundDetailFactory.deploy();
      let bodyDetail = await bodyDetailFactory.deploy();
      let earringsDetail = await earringsDetailFactory.deploy();
      let expressionDetail = await expressionDetailFactory.deploy();
      let eyebrowDetail = await eyebrowDetailFactory.deploy();
      let eyesDetail = await eyesDetailFactory.deploy();
      let hairDetail = await hairDetailFactory.deploy();
      let mouthDetail = await mouthDetailFactory.deploy();
      let noseDetail = await noseDetailFactory.deploy();
      let tatooDetail = await tatooDetailFactory.deploy();

      // Deploy Hypnosis Descriptor (by linking libraries)
      let hypnosisDescriptorFactory = await hre.ethers.getContractFactory("HypnosisDescriptor", {
        libraries: {
          AccessoryDetail: accessoryDetail.address,
          BackgroundDetail: backgroundDetail.address,
          BodyDetail: bodyDetail.address,
          EarringsDetail: earringsDetail.address,
          ExpressionDetail: expressionDetail.address,
          EyebrowDetail: eyebrowDetail.address,
          EyesDetail: eyesDetail.address,
          HairDetail: hairDetail.address,
          MouthDetail: mouthDetail.address,
          NoseDetail: noseDetail.address,
          TatooDetail: tatooDetail.address,
        },
      });
      let hypnosisDescriptor = await hypnosisDescriptorFactory.deploy();

      // Deploy Hypnosis
      let hypnosisFactory = await hre.ethers.getContractFactory("Hypnosis");
      this.hypnosis = await hypnosisFactory.deploy(hypnosisDescriptor.address);
    });

    it("Mint one NFT", async function () {
      await this.hypnosis.create(5);
      let details1 = await this.hypnosis.details(1);
      let details2 = await this.hypnosis.details(2);
      let details3 = await this.hypnosis.details(3);
      let details4 = await this.hypnosis.details(4);
      let details5 = await this.hypnosis.details(5);
      console.log(details1);
      console.log(details2);
      console.log(details3);
      console.log(details4);
      console.log(details5);
      let nft = await this.hypnosis.tokenURI(1);
      console.log(nft);
    });
  });
});
