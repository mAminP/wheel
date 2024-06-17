import * as yup from "yup";

// @ts-ignore
import fa from "yup-locale-fa";

yup.setLocale(fa);
declare module "yup" {
  interface StringSchema {
    code_meli(): StringSchema;

    hex(): StringSchema;

    shenase_meli(): StringSchema;

    codeMeliOrShenaseMeli(): StringSchema;

    english(): StringSchema;

    phoneNumber(): StringSchema;

    number(): StringSchema;
  }
}

yup.addMethod(yup.string, "codeMeliOrShenaseMeli", function () {
  return this.test(
    "codeMeliOrShenaseMeli_test",
    "کد ملی / شناسه ملی معتبر نیست",
    function (input) {
      if (!input) {
        return true;
      }
      if (/^\d{10}$/.test(input)) {
        const check = +input[9];
        const sum =
          input
            .split("")
            .slice(0, 9)
            .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
        return sum < 2 ? check === sum : check + sum === 11;
      } else if (/^\d{11}$/.test(input)) {
        let L = input.length;

        if (L < 11 || parseInt(input, 10) == 0) return false;

        if (parseInt(input.substr(3, 6), 10) == 0) return false;
        let c = parseInt(input.substr(10, 1), 10);
        let d = parseInt(input.substr(9, 1), 10) + 2;
        let z = new Array(29, 27, 23, 19, 17);
        let s = 0;
        for (let i = 0; i < 10; i++)
          s += (d + parseInt(input.substr(i, 1), 10)) * z[i % 5];
        s = s % 11;
        if (s == 10) s = 0;
        return c == s;
      }

      return false;
    },
  );
});

yup.addMethod(yup.string, "shenase_meli", function () {
  return this.test(
    "code_shenase_meli",
    "شنسه ملی معتبر نیست",
    function (input) {
      if (!input) {
        return true;
      }
      let L = input.length;

      if (L < 11 || parseInt(input, 10) == 0) return false;

      if (parseInt(input.substr(3, 6), 10) == 0) return false;
      let c = parseInt(input.substr(10, 1), 10);
      let d = parseInt(input.substr(9, 1), 10) + 2;
      let z = new Array(29, 27, 23, 19, 17);
      let s = 0;
      for (let i = 0; i < 10; i++)
        s += (d + parseInt(input.substr(i, 1), 10)) * z[i % 5];
      s = s % 11;
      if (s == 10) s = 0;
      return c == s;
    },
  );
});

yup.addMethod(yup.string, "code_meli", function () {
  return this.test("code_meli_test", "کد ملی معتبر نیست", function (input) {
    if (!input) {
      return true;
    }
    if (!/^\d{10}$/.test(input)) {
      return false;
    }
    const check = +input[9];
    const sum =
      input
        .split("")
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
  });
});
yup.addMethod(yup.string, "english", function () {
  return this.test(
    "english_test",
    "فقط حروف اینگلیسی مجاز است",
    function (input) {
      if (!input) {
        return true;
      }
      return /^[\u0000-\u007F]*$/.test(input);
    },
  );
});
yup.addMethod(yup.string, "hex", function () {
  return this.test("hex_test", "کد رنگ صحیح نیست", function (input) {
    if (!input) {
      return true;
    }
    return /^#[0-9A-F]{6}$/i.test(input);
  });
});
yup.addMethod(yup.string, "phoneNumber", function () {
  return this.test(
    "phoneNumber_test",
    "فرمت شماره موبایل معتبر نیست",
    function (input) {
      if (!input) {
        return true;
      }
      return /^(\+98|0)?9\d{9}$/g.test(input);
    },
  );
});
yup.addMethod(yup.string, "number", function () {
  return this.test("number-test", "فقط عدد مجاز است", function (input) {
    if (!input) {
      return true;
    }
    return /^\d+$/g.test(input);
  });
});
export { yup };
