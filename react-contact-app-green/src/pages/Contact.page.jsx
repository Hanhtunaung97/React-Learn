import React, { useEffect, useState } from "react";
// import { deleteContactData, getContactData } from "../service/contact.service";
import {
  ContactCardComponents,
  ErrorComponents,
  LoadingComponents,
} from "../components";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../store/services/endpoints/contact.endpoints";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const nav = useNavigate();
  const { isError, isLoading, data, isSuccess } = useGetContactQuery();
  console.log(isError, isLoading, data, isSuccess);
  const [deleteFunction, dataDelete] = useDeleteContactMutation();
  const [deleteItem, setDeleteItem] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  // const [items, setItems] = useState({
  //   loading: true,
  //   data: null,
  //   error: null,
  // });
  // useEffect(() => {
  //   (async () => {
  //     setItems((pre) => ({ ...pre, loading: true }));
  //     const res = await getContactData();
  //     // console.log(res);
  //     if (res.error) {
  //       setItems((pre) => ({ ...pre, loading: false, error: res.msg }));
  //     } else {
  //       setItems((pre) => ({ ...pre, loading: false, data: res }));
  //     }
  //   })();
  // }, [deleteItem]);
  useEffect(() => {
    if (isSuccess) {
      setFetchData(data.contacts.data);
    }
  }, [isSuccess, deleteItem]);
  const deleteContact = async (id) => {
    console.log("delete Id", id);
    const res = await deleteFunction(id);
    console.log(res);
    if (res) {
    }
    setDeleteItem((pre) => !pre);
  };
  return (
    <div className=" flex flex-col justify-center items-center p-3 gap-y-5">
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <>
          {isError ? (
            <ErrorComponents>{isError.message}</ErrorComponents>
          ) : (
            fetchData.map((el) => (
              <ContactCardComponents
                deleteContact={deleteContact}
                key={el.id}
                item={el}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ContactPage;
