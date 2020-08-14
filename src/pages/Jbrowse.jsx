import React from "react";

const App = () => {
	const features = [];
	// Add some features
	const config = {
		containerID: "GenomeBrowser",
		baseUrl: "../",
		refSeqs: {
			url:
				"https://serratus-public.s3.amazonaws.com/tmp/web/cov3ma.fa.fai",
		},
		tracks: [
			{
				key: "Covid Reference Sequence",
				label: "GRCH38 Reference Sequence",
				urlTemplate:
					"https://serratus-public.s3.amazonaws.com/tmp/web/cov3ma.fa",
			},
			{
				urlTemplate : "http://serratus-public.s3.amazonaws.com/tmp/web/ERR2756788.sort.bam",
				storeClass : "JBrowse/Store/SeqFeature/BAM",
				label : "ERR2756788",
				type : "JBrowse/View/Track/Alignments2"
			}
		],
		includes: null,
	};

	// Instantiate JBrowse
	window.addEventListener("load", () => {
		window.JBrowse = new window.Browser(config);
	});

	return (
		<div className="App">
			<h1>
				The is the 
			</h1>
			<div
				style={{ width: "100%", height: 800 }}
				className="jbrowse"
				id="GenomeBrowser" data-config='"allowCrossOriginDataRoot": true, "cacheBuster": true'>
				<div id="LoadingScreen">
					<h1>Loading...</h1>
				</div>
			</div>
		</div>
	);
}

export default App;