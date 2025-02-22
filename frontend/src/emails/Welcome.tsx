import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function Welcome({
  nama,
  email,
}: {
  nama: string;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://blog.fostiums.org/wp-content/uploads/2021/04/logo.png`}
            width="90"
            height="50"
            alt="fosti"
            style={logo}
          />
          <Text style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            Halo! {nama},
          </Text>
          <Text style={paragraph}>
            Yeayy! Selamat kamu udah berhasil daftar di Fosti dengan email{" "}
            {email}! selanjutnya kamu bisa join ke grup wa kita di bawah ini dan
            jangan lupa untuk follow sosmed kita biar ga ketinggalan update yaa!
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="#">
              Join Grup WA
            </Button>
          </Section>
          <Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
            XOXO,
            <br />
            Tim Fosti {new Date().getFullYear()}
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Gedung J Lantai 3 sayap Kanan Fakultas Komunikasi dan Informatika
            Universitas Muhammadiyah Surakarta, Surakarta 57169
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "oklch(0.704 0.14 182.503)",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  fontStyle: "italic",
};
