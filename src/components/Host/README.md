<!-- `rdrp_pos.tsv` source query:

```sql
select distinct on (run_id)
    run_id,
    biosample_id,
    srarun.release_date,
    tax_id,
    scientific_name,
    coordinate_x,
    coordinate_y,
    from_text
from srarun_geo_coordinates sgc
inner join rdrp_pos using (run_id)
inner join srarun on (run_id = srarun.run)
order by run_id
``` -->
