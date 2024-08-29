import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import CompaniesList from './CompaniesList';
import CompanyDetail from './CompanyDetail';
import JobsList from './JobsList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import EditProfileForm from './EditProfileForm';
import RequireAuth from './RequireAuth';

const JoblyRoutes = ({ setTokenAfterLogin, setTokenAfterRegister, editProfileInfo }) => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route
				exact
				path="/companies"
				element={
					<RequireAuth>
						<CompaniesList />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/companies/:handle"
				element={
					<RequireAuth>
						<CompanyDetail />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/jobs"
				element={
					<RequireAuth>
						<JobsList />
					</RequireAuth>
				}
			/>
			<Route exact path="/login" element={<LoginForm setTokenAfterLogin={setTokenAfterLogin} />} />
			<Route exact path="/signup" element={<SignupForm setTokenAfterRegister={setTokenAfterRegister} />} />
			<Route
				exact
				path="/profile"
				element={
					<RequireAuth>
						<EditProfileForm editProfileInfo={editProfileInfo} />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};

export default JoblyRoutes;
