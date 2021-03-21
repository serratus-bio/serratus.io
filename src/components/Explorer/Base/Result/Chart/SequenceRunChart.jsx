import * as d3 from 'd3';

const sequenceSectionKey = "sequences";
const sequenceFamilyNameKey = "family_name";
const sequenceSortKey = "n_reads";

function asdf(summary) {
    var sequencesByFamily = d3.nest()
        .key(d => d[sequenceFamilyNameKey])
        .entries(summary[sequenceSectionKey])
        .reduce(function (obj, x) {
            obj[x["key"]] = x["values"]
            return obj;
        }, {})
        .sort((a, b) => parseFloat(a[sequenceSortKey]) < parseFloat(b[sequenceSortKey]))
}
