import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const logicId = process.env.REACT_APP_LOGIC_ID;

const constructBaseWallet = async () => {
  const wallet = new Wallet(provider);
  await wallet.fromMnemonic(
    process.env.REACT_APP_BASE_MNEMONIC,
    "m/44'/6174'/7020'/0/0"
  );
  console.log(wallet.getAddress());
  return wallet;
};

// Base wallet should only be used for making read calls when user has not connected his wallet
const baseWallet = await constructBaseWallet();

///////////////////////
// Mutate/Write Calls
///////////////////////

// Use ixResponse.result() when the endpoint returns something
// Use ixResponse.wait() when the endpoint doesn't return anything
// and you want to just wait until the ix is settled

const CreateAllocations = async (
  wallet,
  allocationName,
  purpose,
  amountAllocated
) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.CreateAllocations(
    allocationName,
    purpose,
    amountAllocated
  );
  await ixResponse.wait();
};

const UpdateAmountSpent = async (wallet, allocationName, amountSpent) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.UpdateAmountSpent(
    allocationName,
    amountSpent
  );
  return ixResponse.wait();
};

const AddComment = async (wallet, allocationName, comment) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.AddComment(
    allocationName,
    comment
  );
  return ixResponse.wait();
};

///////////////////////
// Observe/Read Calls
///////////////////////

const GetAllocations = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  const ix = await logicDriver.routines.GetAllocations();
  return ix;
};

const logic = {
  CreateAllocations,
  UpdateAmountSpent,
  AddComment,
  GetAllocations,
};

export default logic;
