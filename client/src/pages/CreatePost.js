import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreatePost() {
  
    let history = useHistory();

    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Sem titúlo é complicado, necessita colocar um titúlo"),
        postText: Yup.string().required("OOPPAA, é necessário o corpo da postagem!"),
        username: Yup.string().min(3).max(15,"Seu nome de usuário tem que ter no máximo 15 caracteres").required("Seu nome de usuário é necessário ser maior que 3 caracteres")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            history.push("/")
          });
    };



  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>Titulo</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Título...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />          
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Postagem...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />          
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Usuário...)"
          />

          <button type="submit">Criar Postagem</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
