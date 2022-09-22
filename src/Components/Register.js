import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { gsap, Power2 } from "gsap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const emailContainerRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordContainerRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPasswordActive, setIsPasswordActive] = useState(false);

  const clickRegisterEmail = () => {
    setIsEmailActive(!isEmailActive);
    if (!isEmailActive) {
      emailInputRef.current.focus();
      emailInputRef.current.style.cursor = "text";
      passwordContainerRef.current.style.cursor = "pointer";
      setIsPasswordActive(false);
    }
  };

  const clickRegisterPassword = () => {
    setIsPasswordActive(!isPasswordActive);
    if (!isPasswordActive) {
      passwordInputRef.current.focus();
      passwordInputRef.current.style.cursor = "text";
      emailContainerRef.current.style.cursor = "pointer";
      setIsEmailActive(false);
    }
  };

  useEffect(() => {
    if (isEmailActive) {
      gsap.to(emailContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });
      const timeAnimation = setTimeout(() => {
        gsap.to(emailContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px inset, rgb(255, 255, 255) -5px -5px 10px 0px inset",
          opacity: 1,
          duration: 0.1,
          ease: Power2.easeOut,
        });
      }, 200);

      return () => clearTimeout(timeAnimation);
    } else {
      gsap.to(emailContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });

      const timeAnimation = setTimeout(() => {
        gsap.to(emailContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px,rgb(255, 255, 255) -5px -5px 10px 0px",
          opacity: 1,
          duration: 0.1,
        });
      }, 200);
      return () => clearTimeout(timeAnimation);
    }
  }, [isEmailActive]);

  useEffect(() => {
    if (isPasswordActive) {
      gsap.to(passwordContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });
      const timeAnimation = setTimeout(() => {
        gsap.to(passwordContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px inset, rgb(255, 255, 255) -5px -5px 10px 0px inset",
          opacity: 1,
          duration: 0.1,
          ease: Power2.easeOut,
        });
      }, 200);

      return () => clearTimeout(timeAnimation);
    } else {
      gsap.to(passwordContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });

      const timeAnimation = setTimeout(() => {
        gsap.to(passwordContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px,rgb(255, 255, 255) -5px -5px 10px 0px",
          opacity: 1,
          duration: 0.1,
        });
      }, 200);
      return () => clearTimeout(timeAnimation);
    }
  }, [isPasswordActive]);

  const linkedEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const linkedPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const emailReg = /.+\@.+\..+/;
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

    if (!emailReg.test(emailValue) && !passwordReg.test(passwordValue)) {
      return setErrorMsg(
        "L'email ou le mot de passe ne respectent pas le format requis"
      );
    }

    const data = { email: emailValue, password: passwordValue };

    const response = await fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if(response.ok) navigate("/login");
    else setErrorMsg(response.statusText);

  };

  const goLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <main className="register-container">
      <form id="register">
        <div
          className="input-container"
          ref={emailContainerRef}
          onClick={(e) => clickRegisterEmail(e)}
          value={emailValue || ""}
        >
          <label htmlFor="register-email">Email</label>
          <input
            type="text"
            ref={emailInputRef}
            id="register-email"
            onInput={(e) => linkedEmail(e)}
            value={emailValue || ""}
          />
        </div>

        <div
          className="input-container"
          ref={passwordContainerRef}
          onClick={(e) => clickRegisterPassword(e)}
        >
          <label htmlFor="register-password">Mot de passe</label>
          <input
            type="password"
            id="register-password"
            ref={passwordInputRef}
            onInput={(e) => linkedPassword(e)}
            value={passwordValue || ""}
          />
        </div>

        <button onClick={(e) => submitRegister(e)}>S'inscrire</button>
        <button className="go-login" onClick={(e) => goLogin(e)}>
          Se connecter
        </button>
      </form>
      <div className="error-msg">{errorMsg}</div>
    </main>
  );
};

export default Register;
