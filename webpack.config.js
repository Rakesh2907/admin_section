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
      AddTeachersForm: 'app/components/content/Teachers/AddTeachersForm.jsx'
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
