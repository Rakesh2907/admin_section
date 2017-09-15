var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
    publicPath: '/'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      Dashboard: 'app/components/Dashboard.jsx',
      Login: 'app/components/Login.jsx',
      applicationStyles: 'app/styles/app.scss',
      Navigation: 'app/components/Navigation.jsx',
      LeftSideBar: 'app/components/LeftSideBar.jsx',
      ProfileNavigation: 'app/components/admin_profile/ProfileNavigation.jsx',
      MainMenu: 'app/components/MainMenu.jsx',
      Loader: 'app/components/Loader.jsx',
      DashboadContent: 'app/components/DashboadContent.jsx',
      ApplicationsContent: 'app/components/ApplicationsContent.jsx',
      SearchBar: 'app/components/SearchBar.jsx',
      CopyRight: 'app/components/CopyRight.jsx',
      Clock: 'app/components/Clock',
      DashboardCalender: 'app/components/content/Dashboard/DashboardCalender.jsx',
      Applications: 'app/components/Applications.jsx',
      Students: 'app/components/Students.jsx',
      Teachers: 'app/components/Teachers.jsx',
      AddTeachersForm: 'app/components/content/Teachers/AddTeachersForm.jsx',
      ApplicantDocument: 'app/components/content/Applications/ApplicantDocument.jsx',
      AdmissionFees: 'app/components/content/Applications/AdmissionFees.jsx',
      ControlledTabs: 'app/components/content/Applications/ControlledTabs.jsx',
      ApplicantForm: 'app/components/content/Applications/ApplicantForm.jsx',
      ChildForm: 'app/components/content/Applications/ChildForm.jsx',
      FatherForm: 'app/components/content/Applications/FatherForm.jsx',
      MotherForm: 'app/components/content/Applications/MotherForm.jsx',
      GuardianForm: 'app/components/content/Applications/GuardianForm.jsx',
      Interview: 'app/components/content/Applications/Interview.jsx',
      ApplicationFormStatus: 'app/components/content/Applications/ApplicationFormStatus.jsx',
      Parents: 'app/components/Parents.jsx',
      Classes: 'app/components/Classes.jsx',
      Subjects: 'app/components/Subjects.jsx',
      Fees: 'app/components/Fees.jsx',
      Attendance: 'app/components/Attendance.jsx',
      Exam: 'app/components/Exam.jsx',
      Library: 'app/components/Library',
      Accounting: 'app/components/Accounting',
      Transport: 'app/components/Transport',
      Notice: 'app/components/Notice',
      AddStudentForm: 'app/components/content/Students/AddStudentForm.jsx',
      CandidateForm: 'app/components/content/Students/CandidateForm.jsx',
      CourseBatch: 'app/components/content/Students/CourseBatch.jsx',
      StudentFather: 'app/components/content/Students/StudentFather.jsx',
      StudentMother: 'app/components/content/Students/StudentMother.jsx',
      StudentDocuments: 'app/components/content/Students/StudentDocuments.jsx',
      StudentFees: 'app/components/content/Students/StudentFees.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
       { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
       { test: /\.json$/, loader: 'json-loader' },
       { test: /\.css$/, loader: 'style-loader!css-loader' },
       { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
       {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
	  includePaths: [
		path.resolve(__dirname, 'node_modules/foundation-sites/scss')			 
	  ]
  },
  devtool: 'cheap-module-eval-source-map'
};
