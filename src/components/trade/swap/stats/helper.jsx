import BigNumber from "bignumber.js";
import apiRequest from "../../../../helpers/connections";
import { notificationActions } from "../../../../store/notification/notification";

export const getLockerByOwner = async (address) => {
  try {
    const data = await apiRequest(
      "locker/owner/" + address,
      undefined,
      undefined,
      undefined
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendToken = async (
  dispatch,
  lockContract,
  lockWalletInstance,
  lockRootInstance,
  data,
  lock,
  address
) => {
  dispatch(notificationActions.setNotify(true));
  try {
    //get userwallet and call tranfertowallet to the stake contract
    const { value0 } = await lockRootInstance.methods
      .walletOf({ answerId: 0, walletOwner: lockContract })
      .call();

    const tx = await lockWalletInstance.methods
      .transferToWallet({
        amount: (new BigNumber(lock.amount.toString()).shift(data.lockRootDecimal)).toFixed(),
        recipientTokenWallet: value0,
        remainingGasTo: address,
        notify: true,
        payload: "te6ccgEBAQEAAgAAAA==",
      })
      .send({
        amount: String(2 * 10 ** 9),
        bounce: true,
        from: address,
      })
      .catch((e) => {
        if (e.code === 3) {
          // rejected by a user
          dispatch(notificationActions.setMessage("User rejected transaction"));
        } else {
          // The message has expired or some other
          // perform any necessary error handling
          dispatch(notificationActions.setMessage(e.message));
        }
      });

    //send update data
    if (tx) {
      setTimeout(async () => {
        try {
          await apiRequest(
            "locker/update",
            {
              lock_id: lock.lock_id,
              contract_id: lock.contract_id,
              locker_id: data.locker_id,
            },
            "POST",
            undefined
          );
          dispatch(
            notificationActions.setMessage("Supply was successful")
          );
        } catch (error) {
          if (error?.info?.error?.status === 422) {
            dispatch(
              notificationActions.setMessage(error?.info?.error?.message)
            );
          } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
          }
        }
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    if (error?.info?.error?.status === 422) {
      dispatch(notificationActions.setMessage(error?.info?.error?.message));
    } else {
      dispatch(notificationActions.setMessage("Something went wrong"));
    }
  }
};

export const publishLocker = async (dispatch, data) => {
  dispatch(notificationActions.setNotify(true));
  try {
    await apiRequest(
      "locker/publish",
      {
        lockContract: data.lockContract,
      },
      "POST",
      undefined
    );
    dispatch(
      notificationActions.setMessage("Locker was published successfully")
    );
  } catch (error) {
    if (error?.info?.error?.status === 422) {
      dispatch(notificationActions.setMessage(error?.info?.error?.message));
    } else {
      dispatch(notificationActions.setMessage("Something went wrong"));
    }
  }
};

export const getLockerByContract = async (dispatch, navigate, contract) => {
  try {
    const res = await apiRequest(
      "locker/" + contract,
      undefined,
      undefined,
      undefined
    );
    return res

  } catch (error) {
    dispatch(notificationActions.setNotify(true))
    if (error?.info?.error?.status === 422) {
      dispatch(notificationActions.setMessage(error?.info?.error?.message));
    } else {
      dispatch(notificationActions.setMessage("Something went wrong"));
    }
    navigate("/locker")
  }
};

export const getPair = async () => {
  try {
    const res = await apiRequest(
      "swap/pairs",
      undefined,
      undefined,
      undefined
    );
    return res.data

  } catch (error) {
    console.log(error);

  }
};

export const getPairDet = async (address, navigate, setLoading) => {
  try {
    const res = await apiRequest(
      "swap/pairs/" + address,
      undefined,
      undefined,
      undefined
    );
    return res.data

  } catch (error) {
    setLoading(false)
    navigate("/analytics")
    console.log(error);

  }
};

export const ExtendLock = async (
  dispatch,
  lockContractInstance,
  time,
  lock,
  address,
  data
) => {
  dispatch(notificationActions.setNotify(true));
  if (time <= lock.unlockDate) {
    dispatch(notificationActions.setMessage("New unlock time must be greater than previous unlock time"))
    return
  }
  try {
    //get userwallet and call tranfertowallet to the stake contract

    const tx = await lockContractInstance.methods
      .increaseUnlock({
        _lockId: lock.contract_id,
        _newTime: String(time).slice(0, 10),
      })
      .send({
        amount: String(1 * 10 ** 9),
        bounce: true,
        from: address,
      })
      .catch((e) => {
        if (e.code === 3) {
          // rejected by a user
          dispatch(notificationActions.setMessage("User rejected transaction"));
        } else {
          console.log(e);
          // The message has expired or some other
          // perform any necessary error handling
          dispatch(notificationActions.setMessage(e.message));
        }
      });

    //send update data
    if (tx) {
      setTimeout(async () => {
        try {
          await apiRequest(
            "locker/update",
            {
              lock_id: lock.lock_id,
              contract_id: lock.contract_id,
              locker_id: data.locker_id,
            },
            "POST",
            undefined
          );
          dispatch(
            notificationActions.setMessage("Extension was Successful")
          );
        } catch (error) {
          if (error?.info?.error?.status === 422) {
            dispatch(
              notificationActions.setMessage(error?.info?.error?.message)
            );
          } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
          }
        }
      }, 3000);
    }
  } catch (error) {
    if (error?.info?.error?.status === 422) {
      dispatch(notificationActions.setMessage(error?.info?.error?.message));
    } else {
      console.log(error);
      dispatch(notificationActions.setMessage("Something went wrong"));
    }
  }
};

export const unLockHelper = async (
  dispatch,
  lockContractInstance,
  lock,
  address,
  data
) => {
  dispatch(notificationActions.setNotify(true));
  try {
    //get userwallet and call tranfertowallet to the stake contract

    const tx = await lockContractInstance.methods
      .unLock({
        _lockId: lock.contract_id,
      })
      .send({
        amount: String(3 * 10 ** 9),
        bounce: true,
        from: address,
      })
      .catch((e) => {
        if (e.code === 3) {
          // rejected by a user
          dispatch(notificationActions.setMessage("User rejected transaction"));
        } else {
          console.log(e);
          // The message has expired or some other
          // perform any necessary error handling
          dispatch(notificationActions.setMessage(e.message));
        }
      });

    //send update data
    if (tx) {
      setTimeout(async () => {
        try {
          await apiRequest(
            "locker/update",
            {
              lock_id: lock.lock_id,
              contract_id: lock.contract_id,
              locker_id: data.locker_id,
            },
            "POST",
            undefined
          );
          dispatch(
            notificationActions.setMessage("Claim was Successful")
          );
        } catch (error) {
          if (error?.info?.error?.status === 422) {
            dispatch(
              notificationActions.setMessage(error?.info?.error?.message)
            );
          } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
          }
        }
      }, 3000);
    }
  } catch (error) {
    if (error?.info?.error?.status === 422) {
      dispatch(notificationActions.setMessage(error?.info?.error?.message));
    } else {
      console.log(error);
      dispatch(notificationActions.setMessage("Something went wrong"));
    }
  }
};

export const updateLock = async (
  dispatch,
  lock,
  data
) => {
  dispatch(notificationActions.setNotify(true));
  //get userwallet and call tranfertowallet to the stake contract

  try {
    await apiRequest(
      "locker/update",
      {
        lock_id: lock.lock_id,
        contract_id: lock.contract_id,
        locker_id: data.locker_id,
      },
      "POST",
      undefined
    );
    dispatch(
      notificationActions.setMessage("Lock was updated Successfully")
    );

  } catch (error) {
    if (error?.info?.error?.status === 422) {
      dispatch(notificationActions.setMessage(error?.info?.error?.message));
    } else {
      console.log(error);
      dispatch(notificationActions.setMessage("Something went wrong"));
    }
  }
};