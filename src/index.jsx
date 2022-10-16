import Post from "./Post";
import * as $ from "jquery"
import "../src/styles/stytles.css"
import webpackLogo from '../src/assets/img'
import xml from '../src/assets/data.xml'
import csv from '../src/assets/data.csv'
import './styles/lessStyle.less'
import './styles/sassStyle.sass'
import './babel'
import React from "react";
import {render} from "react-dom"


const post = new Post("Webpack post title", webpackLogo)
$('pre').addClass('code').html(post.toString())

const App = () => {
    return <div>
        <div className="container">
            <h1>Webpack</h1>
        </div>
        <hr/>
        <div className="logo"></div>
        <hr/>
        <pre></pre>
        <hr/>
        <div className="box">
            <h2>less</h2>
        </div>
        <hr/>
        <div className="card">
            <h2>sass</h2>
        </div>
    </div>
}

render(<App/>, document.getElementById('app'))


console.log(post.toString())
console.log("xml", xml)
console.log("csv", csv)
