import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

export const StaticAPI = {
  login: {
    url: `${baseUrl}/login`,
  },
  signup: {
    url: `${baseUrl}/signup`,
  },
  getEmployees: {
    url: `${baseUrl}/employees`,
  },
  updateEmployee: {
    url: `${baseUrl}/employee/@@EMPLOYEEID@@`,
  },
  addEmployee: {
    url: `${baseUrl}/employee`
  },
  deleteEmployee: {
    url: `${baseUrl}/employee/@@EMPLOYEEID@@`,
  },
};
