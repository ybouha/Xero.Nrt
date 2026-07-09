package com.xero.webapi.pipeline;

/**
 * Row counts returned by an {@link NrtPipelineRunner} once compare + save phases finish.
 *
 * @param refCount      total rows fetched from the reference side
 * @param tgtCount      total rows fetched from the target side
 * @param diffCount     rows present on both sides but with at least one differing field
 * @param onlyRefCount  rows present only on the reference side
 * @param onlyTgtCount  rows present only on the target side
 */
public record PipelineCounts(
        int refCount,
        int tgtCount,
        int diffCount,
        int onlyRefCount,
        int onlyTgtCount) {
}
