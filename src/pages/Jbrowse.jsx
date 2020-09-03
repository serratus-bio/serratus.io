import React from "react";

const App = (props) => {
	var urlParams = new URLSearchParams(props.location.search);
	var bam = urlParams.get("bam");
	var loc = urlParams.get("loc");

	// const features = [];
	// Add some features
	const config = {
		containerID: "GenomeBrowser",
		refSeqs: {
			url: "https://serratus-public.s3.amazonaws.com/tmp/web/cov3ma.fa.fai",
		},
		tracks: [
			{
				key: "Cov3ma Reference Sequence",
				label: "Cov3ma Reference Sequence",
				urlTemplate: "https://serratus-public.s3.amazonaws.com/tmp/web/cov3ma.fa",
			},
			{
				urlTemplate : `https://serratus-bio.s3.amazonaws.com/bam/${bam}.bam`,
				storeClass : "JBrowse/Store/SeqFeature/BAM",
				label : bam,
				type : "JBrowse/View/Track/Alignments2",
			}
		],
		includes: null,
	};

	// Instatiate JBrowse
	React.useEffect(() => {
		console.log("reload")
		window.addEventListener("load", () => {
			window.JBrowse = new window.Browser(config);
			window.JBrowse.navigateTo(loc);
			window.localStorage.setItem('GenomeBrowser-refseq-', loc);
			window.localStorage.setItem('GenomeBrowser-tracks-', `Cov3ma Reference Sequence,${bam}`);
			console.log(window.JBrowse)
		});
	}, [config, bam, loc])

	return (
		<div className="App">
			<h1 className="text-center text-2xl">
				SRA: {bam} 
			</h1>
			<div
				style={{ width: "100%", height: 800 }}
				className="jbrowse"
				id="GenomeBrowser"
				data-config='"updateBrowserURL": true'>
				<div id="LoadingScreen">
					<h1>Loading...</h1>
				</div>
			</div>
		</div>
	);
}

export default App;