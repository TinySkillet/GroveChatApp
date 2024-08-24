import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "No image selected! You will have the default profile picture!",
        status: "Warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } else if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "grove-chat");
      data.append("cloud_name", "grove-chat");
      fetch("https://api.cloudinary.com/v1_1/grove-chat/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ["picture"]: data.url.toString(),
          }));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    const values = Object.values(formData);
    for (const val of values.slice(0, -1)) {
      if (!val) {
        toast({
          title: "Please fill all the fields!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
    }
    if (formData.password != formData.confirmPassword) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { name, email, password, picture } = formData;
      let dataToSend = { name, email, password };
      if (picture) {
        dataToSend.picture = picture;
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        dataToSend,
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        // description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"10px"} color={"black"}>
      <FormControl isRequired>
        <FormLabel fontWeight={"bold"}>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          name="name"
          onChange={handleChange}
          value={formData["name"]}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel fontWeight={"bold"}>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
          value={formData["email"]}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel fontWeight={"bold"}>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            value={formData["password"]}
            type={showPassword ? "text" : "password"}
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel fontWeight={"bold"}>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm your password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData["confirmPassword"]}
            type={showPassword ? "text" : "password"}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              background={"transparent"}
              width="5rem"
              size="md"
              onClick={() => setShowPassword(false)}
              onMouseDown={() => setShowPassword(true)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          name="picture"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        marginTop={"15px"}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
