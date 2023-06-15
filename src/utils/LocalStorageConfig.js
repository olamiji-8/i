import SecureLS from "secure-ls";

const ls = new SecureLS({
    isCompression: true,
    encodingType: "rabbit",
    encryptionSecret: "c_tribute",
  });

  export const Local_storage = () => {
    return ls
}
  