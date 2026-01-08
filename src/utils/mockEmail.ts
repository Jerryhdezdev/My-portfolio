type MockEmailResponse = {
  status: number;
  text: string;
};

const FORCE_ERROR = false; // switch true / false to test

export function mockSendEmail(
  _serviceId: string,
  _templateId: string,
  _data: unknown,
  _publicKey: string
): Promise<MockEmailResponse> {
  return new Promise((resolve, reject) => {
    console.log("📨 MOCK EMAIL");
    console.log("Data:", _data);

    setTimeout(() => {
      if (FORCE_ERROR) {
        reject({
          status: 500,
          text: "Mock email failed",
        });
      } else {
        resolve({
          status: 200,
          text: "Mock email sent successfully",
        });
      }
    }, 1200);
  });
}
