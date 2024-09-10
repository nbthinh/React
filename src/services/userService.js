import axios from "../axios";
const handleLoginApi = async (userEmail, userPassword) => {
  console.log("Đái trong quần");
  let abc = await axios.post("/api/login", {
    email: userEmail,
    password: userPassword,
  });
  console.log("abc = ", abc);
  return abc;
};

const getAllUsers = async (inputId) => {
  return await axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = async (data) => {
  return await axios.post("/api/create-new-user", data);
};

const deleteUserService = async (userId) => {
  return await axios.delete("/api/delete-user", {
    // headers: {
    //     Authorization: authorizationToken
    // },
    data: {
      id: userId,
    },
  });
};

const editUserService = async (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = (limit) => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = async (data) => {
  return await axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);

}

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);

}

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};


const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
}

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
}

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};

const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
}

const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
}

const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};

const postSendRemedy = (data) => {
  return axios.post(`/api/sendRemedy`, data);
}

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy
};
